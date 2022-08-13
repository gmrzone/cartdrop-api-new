import express, { Application, Request, Response } from "express";


const app: Application = express()
const PORT = 5000



app.get('/', (req: Request, res: Response) => {
    return res.status(200).json({status: "ok"})
})

app.listen(PORT, () => console.log(`Application is running on port ${PORT}`))