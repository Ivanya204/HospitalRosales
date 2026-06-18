import express from "express";
import medicalAppointmentsController from "../controller/medicalAppointmentController.js";

const router = express.Router()

router.route("/").get(medicalAppointmentsController.getAppointment).post(medicalAppointmentsController.insertAppointment)

router.route("/:id").put(medicalAppointmentsController.updateAppointment).delete(medicalAppointmentsController.deleteAppointment)

export default router