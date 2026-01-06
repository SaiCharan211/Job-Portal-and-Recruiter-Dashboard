import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes/authRoutes.js'
import jobRoutes from './routes/jobRoutes.js'
import applicationRoutes from './routes/applicationRoutes.js'

dotenv.config()

const app = express()
app.use(cors())

app.use(express.json())

app.use("/api/auth", router)
app.use("/api/jobs", jobRoutes)
app.use("/api/applications",applicationRoutes)


app.get('/', (req, res) => {
    res.send("SmartHire API running")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})