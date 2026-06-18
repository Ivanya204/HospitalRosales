import upload from "../utils/cloudinaryConfig,js";
import express from "express";
import medicalEquipment from "../controller/medicalEquipmentController.js";

const router = express.Router();
router.route("/").get(medicalEquipment.getMedicalEquipment).post(upload.single("image"), medicalEquipment.insertMedicalEquipment)

router.route("/:id").delete(medicalEquipment.deleteMedicalEquipment).put(upload.single("image"), medicalEquipment.updateMedicalEquipment)
export default router