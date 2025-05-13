import { client } from '../index'
import * as fs from 'fs'
import * as path from 'path'

export const init = async () => {
  try {
    await client.connect()

    const sqlFilePath = path.join(__dirname, '..', 'database.sql')
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8')

    await client.query(sqlContent)

    console.log('Database initialized successfully')
  } catch (error) {
    console.error('Database initialization error: ', error)
    throw error
  } finally {
    await client.end()
  }
}

if (require.main === module) {
  init()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))
}
