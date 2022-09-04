import express, { Application, Request, Response } from "express";
import database from './db/index';
import user from './services/userService';
const app: Application = express()
const PORT = process.env['SERVER_PORT']

database.runMigrations()

app.use(express.json())
app.use('/static', express.static('public'))

app.get('/', async (req: Request, res: Response) => {
    await user.createUser("gmrzone", "27021992", "9220976696", "saiyedafzalgz@gmail.com", "customer", "Afzal", "Saiyed")
    const pool = database.getQuery()
    const data = await pool.query('SELECT * FROM public.users ORDER BY id ASC')
    console.log(process.env['POSTGRES_USER'], "postgres user")
    console.log(process.env['POSTGRES_PASSWORD'], "postgres_password")
    console.log(process.env['POSTGRES_DB_NAME'], "Database name")
    console.log(process.env['POSTGRES_DB_HOST'], "database host")
    console.log(PORT, "Server Port")
    console.log(process.env.NODE_ENV, "Node environment")
    return res.status(200).json({status: "ok", data: data.rows})
})

app.listen(PORT, () => console.log(`Application is running on port ${PORT}`))