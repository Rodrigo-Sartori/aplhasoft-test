import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Contact } from '../model/Contact'
import * as dotenv from 'dotenv'
import { User } from '../model/User'

dotenv.config()

export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [Contact,User],
})
