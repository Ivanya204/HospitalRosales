import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import login from "./routes/login.js"
import logout from "./routes/logout.js"
import medicalAppointments from "./routes/medicalAppointments.js"
import medicalEquipment from './routes/medicalEquipment.js'
import medicalRecords from "./routes/medicalRecords.js";
import medicalSpecialties from "./routes/medicalSpecialties.js"
import patients from "./routes/patients.js";
import registerPatients from "./routes/patients.js"


const app = express()

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())

app.use("/api/loginPatient", login)
app.use("/api/logoutPatient", logout)
app.use("/api/medicalAppointments", medicalAppointments)
app.use("/api/medicalEquipment", medicalEquipment)
app.use("/api/medicalRecords", medicalRecords)
app.use("/api/medicalSpecialties", medicalSpecialties)
app.use("/api/patients", patients)
app.use("/api/registerPatients",registerPatients)

export default app;