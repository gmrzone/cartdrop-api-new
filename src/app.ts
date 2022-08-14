import express, { Application, Request, Response } from "express";
import { Client } from 'pg';
import { Database } from './db/index'
const app: Application = express()
const PORT = process.env['SERVER_PORT']

const database = new Database()
database.runMigrations()

app.get('/', async (req: Request, res: Response) => {
    const client = new Client({
        user: process.env['POSTGRES_USER'],
        host: process.env['POSTGRES_DB_HOST'],
        database: process.env['POSTGRES_DB_NAME'],
        password: process.env['POSTGRES_PASSWORD'],
        port: Number(process.env["POSTGRES_DB_PORT"])
    })
    client.connect()
    const data = await client.query('SELECT * FROM public.accounts_cartdrop_users ORDER BY id ASC')
    console.log(process.env['POSTGRES_USER'], "postgres user")
    console.log(process.env['POSTGRES_PASSWORD'], "postgres_password")
    console.log(process.env['POSTGRES_DB_NAME'], "Database name")
    console.log(process.env['POSTGRES_DB_HOST'], "database host")
    console.log(PORT, "Server Port")
    console.log(process.env.NODE_ENV, "Node environment")
    return res.status(200).json({status: "ok", data: data.rows})
})

app.listen(PORT, () => console.log(`Application is running on port ${PORT}`))