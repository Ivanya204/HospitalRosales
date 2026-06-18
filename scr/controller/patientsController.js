import patientsModel from "../model/patients"
import {v2 as cloudinary} from "cloudinary"

const patientsContoller = {}

patientsContoller.getPatients = async (req, res) =>{
    try {
        const patients = await patientsModel.find()
        return res.status(200).json (patients)
    } catch (error) {
        return res.status(500).json({message: "Intenal sever error"})
    }
}
/*
name
lastName
email
password
phone
address
phoneEmergencyContacts [{ phone, nameEmergencyContact }]
profilePhoto
isVerified
loginAttempts
timeOut
*/
patientsContoller.updatePatients = async (req, res)=>{
    try {
        let {name, lastName, email, password, phone, address, phoneEmergencyContacts, isVerified, loginAttempts, timeOut} = req.body
        const patientFound = 
        const updatePatient = await patientsModel.findByIdAndUpdate(
            req.params.id,
        {
            name, 
            lastName, 
            email, 
            password, 
            phone, 
            address, 
            phoneEmergencyContacts, 
            isVerified, 
            loginAttempts, 
            timeOut
        }, {
            new: true
        })
        if(req.file){
            await cloudinary.uploader.destroy(updatePatient)
        }
    } catch (error) {
        
    }
}

