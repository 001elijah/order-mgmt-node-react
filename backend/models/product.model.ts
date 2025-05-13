import { query } from '../db'
import { Product } from '../types/product'

export const productModel = {
  create: async ({ name, price, stock }: Omit<Product, 'id'>): Promise<Product> => {
    const { rows } = await query(
      `INSERT INTO products (name, price, stock)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, price, stock]
    )
    return rows[0]
  },
  findAll: async (): Promise<Product[] | null> => {
    const { rows, rowCount } = await query(`
      SELECT *
      FROM products
    `)
    return rowCount === 0 ? null : rows
  },
  findById: async (id: string): Promise<Product | null> => {
    const { rows, rowCount } = await query(
      `
        SELECT *
        FROM products
        WHERE id = $1
      `,
      [id]
    )
    return rowCount === 1 ? rows[0] : null
  },
  update: async (id: string, product: Product): Promise<Product | null> => {
    const keys = Object.keys(product).filter(key => key !== 'id')
    if (keys.length === 0) return null

    const setClause = keys.map((key, index) => `${key} = $${index + 2}`).join(', ')
    const values = keys.map(key => product[key as keyof Product])
    const { rows, rowCount } = await query(
      `
        UPDATE products
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
        FROM products
        WHERE id = $1
        RETURNING id
      `,
      [id]
    )
    return rowCount ? rowCount > 0 : null
  }
}
