import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken"

import patientModel from "../model/patients.js"
import { config } from "../config.js";

const loginContoller ={}

loginContoller.login = async (req, res)=> {
    try {
        const {email, password} =req.body;
        const userFound = await patientModel.findOne({email})
        if(!userFound){
            return res.status(404).json({message: "No hay usuarios que coincidan"})
        }
        if(userFound.timeOut && userFound.timeOut> Date.now()){
            return res.status(403).json({message: "Acceso bloqueado"})
        }
        const isMatch = await bcrypt.compare(password, userFound.password)

        if(!isMatch){
            userFound.loginAttemps = (userFound.loginAttemps || 0)+1
            if(userFound.loginAttemps >=5){
                userFound.timeOut = Date.now() +15*60*1000
                userFound.loginAttemps = 0
                await userFound.save()
                return res.status(403).json({message: "Acceso bloqueado"})
            }
            await userFound.save()
            return res.status(401).json({message: "La contraseña esta incorrecta"})
        }

        userFound.loginAttemps = 0 
        userFound.timeOut = null
        await userFound.save()

        const token = jsonwebtoken.sign(
            {id: userFound._id, userType: "patient"},
            config.JWT.secret,
            {expiresIn: "30d"}
        )

        res.cookie("authCookie", token)
        return res.status(200).json({message: "Se pudo inciar sesion"})
    } catch (error) {
        console.log("error " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default loginContoller