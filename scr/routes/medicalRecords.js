import express from "express";
import medicalRecords from "../controller/medicalRecordsController.js";

const router = express.Router()

router.route("/").get(medicalRecords.getMedicalRecords).post(medicalRecords.insertMedicalRecords)

router.route("/:id").delete(medicalRecords.deleteMedicalRecords).put(medicalRecords.updateMedicalRecords)

export default router