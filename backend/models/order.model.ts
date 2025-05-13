import { client, query } from '../db'
import { Order } from '../types/order'
import { productModel } from './product.model'

const createOrder = async ({ user_id, product_id, quantity, total_price }: Omit<Order, 'id' | 'created_at'>): Promise<Order[]> => {
  const { rows } = await client.query(
    `INSERT INTO orders (user_id, product_id, quantity, total_price)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [user_id, product_id, quantity, total_price]
  )
  return rows
}

const updateProductStock = async ({ quantity, product_id }: Omit<Order, 'id' | 'user_id' | 'total_price' | 'created_at'>) =>
  await client.query(
    `UPDATE products
     SET stock = stock - $1
     WHERE id = $2`,
    [quantity, product_id]
  )

const updateUserBalance = async ({ total_price, user_id }: Omit<Order, 'id' | 'product_id' | 'quantity' | 'created_at'>) =>
  await client.query(
    `UPDATE users SET balance = balance - $1 WHERE id = $2`, [total_price, user_id]
  )

export const orderModel = {
  create: async ({ user_id, product_id, quantity }: Omit<Order, 'id' | 'total_price' | 'created_at'>): Promise<Order> => {
    try {
      await client.connect()
      await client.query('BEGIN')

      const product = await productModel.findById(product_id)
      if (!product) throw new Error('Product not found')
      if (product.stock < quantity) throw new Error('Not enough stock')

      const total_price = product.price * quantity

      const order_rows = await createOrder({ user_id, product_id, quantity, total_price })
      await updateProductStock({ quantity, product_id })
      await updateUserBalance({ total_price, user_id })

      await client.query('COMMIT')
      return order_rows[0]
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    }
  },
  findAll: async (): Promise<Order[] | null> => {
    const { rows, rowCount } = await query(`
      SELECT *
      FROM orders
    `)
    return rowCount === 0 ? null : rows
  },
  findById: async (id: string): Promise<Order | null> => {
    const { rows, rowCount } = await query(
      `
        SELECT *
        FROM orders
        WHERE id = $1
      `,
      [id]
    )
    return rowCount === 1 ? rows[0] : null
  },
  findByUserId: async (user_id: string): Promise<Order[] | null> => {
    const { rows, rowCount } = await query(
      `
        SELECT *
        FROM orders
        WHERE user_id = $1
      `,
      [user_id]
    )
    return rowCount === 0 ? null : rows
  },
  update: async (id: string, order: Order): Promise<Order | null> => {
    const keys = Object.keys(order).filter(key => key !== 'id')
    if (keys.length === 0) return null

    const setClause = keys.map((key, index) => `${key} = $${index + 2}`).join(', ')
    const values = keys.map(key => order[key as keyof Order])
    const { rows, rowCount } = await query(
      `
        UPDATE orders
        SET ${setClause}
        WHERE id = $1
        RETURNING *
      `,
      [id, ...values]
    )
    return rowCount === 1 ? rows[0] : null
  },
  delete: async (id: string): Promise<boolean | null> => {
    const { rowCount } = await query(
      `
        DELETE
        FROM orders
        WHERE id = $1
        RETURNING id
      `,
      [id]
    )
    return rowCount ? rowCount > 0 : null
  }
}
