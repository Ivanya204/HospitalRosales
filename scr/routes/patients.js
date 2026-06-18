import express from "express";
import patientsContoller from "../controller/patientsController.js";
import upload from "../utils/cloudinaryConfig.js";
const router = express.Router();

router.route("/").get(patientsContoller.getPatients)

router.route("/:id").delete(patientsContoller.deletePatient).put(upload.single("image"), patientsContoller.updatePatients)
export default router