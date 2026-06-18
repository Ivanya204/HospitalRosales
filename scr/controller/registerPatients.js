import nodemailer from "nodemailer"
import cryptp from "crypto"
import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcryptjs"

import patientsModel from "../model/patients.js"

import { config } from "../config.js"
import { text } from "stream/consumers"
import { info } from "console"

const registerPatient = {}

registerPatient.register = async (req, res)=>{
    const {name, lastName, email, password, phone, address, phoneEmergencyContacts, isVerified, loginAttempts, timeOut} = req.body
    try {
        const existPatient = await patientsModel.findOne({email})
        if(!existPatient){
            return res.status(400).json({message: "No coincide o no existe, linea 17"})
        }

        const passwordHash = await bcrypt.hash(password, 10)
        const verificationCode = cryptp.randomBytes(3).toString("hex")
        const tokenCode = jsonwebtoken.sign({
            name, lastName, email, password, phone, address, phoneEmergencyContacts, isVerified, loginAttempts, timeOut, verificationCode, passwordHash
        }, 
        config.JWT.secret,
        {expiresIn: "15m"});
        res.cookie("verificationToken", tokenCode, {maxAge: 15*60*1000});

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: config.email.user_email,
                pass: config.email.user_password
            }
        });
        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject : "Verificacion de cuenta",
            text: "Para verificar su correo electronico por favor ingrese el siguiente código, el cual vencera en 15 minutos " + verificationCode
        };
        transporter.sendMail(mailOptions, (error, info)=>{
            if(error){
                console.log("error "+ error)
                return res.status(500).json({message: "Internal server error al enviar el correo"})
            }
            return res.status(200).json({message: "Correo enviado exitosamente"})
        })
        
    } catch (error) {
        console.log("error " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

registerPatient.verifyCode  = async ( req, res )=>{
    try {
        const {verificationCodeRequest} = req.body
    const token = req.cookies.verificationToken
    const decoded = jsonwebtoken.verify(token, config.JWT.secret)
    const {name,  lastName, email, verificationCode: storedCode, passwordHash, phone, address, phoneEmergencyContacts, isVerified, loginAttempts, timeOut} = decoded
    if (verificationCodeRequest !== storedCode){
        return res.status(400).json({message: "El código esta mal escrito o ingresado"})
    }
    const newPatient = new patientsModel({
        name,  lastName, email, password: passwordHash, phone, address, phoneEmergencyContacts, isVerified: true, loginAttempts, timeOut
    })
    await newPatient.save()

    const patient = await patientsModel.findOne({email})
    patient.isVerified = true
    await patient.save()
    res.clearCookie("verificationToken")
    res.json({message: "Correo verificado"})
    } catch (error) {
        console.log("error " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default registerPatient