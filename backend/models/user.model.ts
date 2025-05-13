import { query } from '../db'
import { User } from '../types/user'

export const userModel = {
  create: async ({ name, email, balance }: Omit<User, 'id'>): Promise<User> => {
    const { rows } = await query(
      `
      INSERT INTO users (name, email, balance)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      [name, email, balance]
    )
    return rows[0]
  },
  findAll: async (): Promise<User[] | null> => {
    const { rows, rowCount } = await query(`
      SELECT *
      FROM users
    `)
    return rowCount === 0 ? null : rows
  },
  findById: async (id: string): Promise<User | null> => {
    const { rows, rowCount } = await query(
      `
      SELECT *
      FROM users
      WHERE id = $1
    `,
      [id]
    )
    return rowCount === 1 ? rows[0] : null
  },
  update: async (id: string, user: User): Promise<User | null> => {
    const keys = Object.keys(user).filter(key => key !== 'id')
    if (keys.length === 0) return null

    const setClause = keys.map((key, index) => `${key} = $${index + 2}`).join(', ')
    const values = keys.map(key => user[key as keyof User])

    const { rows, rowCount } = await query(
      `
      UPDATE users
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
      FROM users
      WHERE id = $1
      RETURNING id
    `,
      [id]
    )
    return rowCount ? rowCount > 0 : null
  }
}
