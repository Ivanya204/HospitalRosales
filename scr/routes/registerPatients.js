import express from "express"
import registerPatient from "../controller/registerPatients.js"

const router = express.Router()

router.route("/").post (registerPatient.register)
router.route("/verifyCodeEmail").post(registerPatient.verifyCode)

export default router