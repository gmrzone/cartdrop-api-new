import express, { Application, Request, Response } from "express";


const app: Application = express()
const PORT = process.env['PORT']



app.get('/', (req: Request, res: Response) => {
    console.log(process.env['POSTGRES_USER'], "postgres user")
    console.log(process.env['POSTGRES_PASSWORD'], "postgres_password")
    console.log(process.env['DB_NAME'], "Database name")
    console.log(process.env['DB_HOST'], "database host")
    console.log(PORT, "Server Port")
    console.log(process.env.NODE_ENV, "Node environment")
    return res.status(200).json({status: "ok"})
})

app.listen(PORT, () => console.log(`Application is running on port ${PORT}`))