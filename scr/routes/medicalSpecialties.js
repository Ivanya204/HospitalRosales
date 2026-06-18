import express from "express";
import medicalSpecialtiesController from "../controller/medicalSpecialitiesController.js";

const router = express.Router();

router.route("/").get(medicalSpecialtiesController.getMedicalSpecialties).post(medicalSpecialtiesController.insertMedicalSpecialties)

router.route("/:id").delete(medicalSpecialtiesController.deleteMedicalSpeciality).put(medicalSpecialtiesController.updateMedicalSpecialties)

export default router