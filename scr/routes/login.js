import express from "express"
import loginContoller from "../controller/loginPatients.js"

const router = express.Router()

router.route("/").post(loginContoller.login)

export default router