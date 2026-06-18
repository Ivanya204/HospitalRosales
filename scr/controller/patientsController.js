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
        const patientFound = await patientsModel.findById(req.params.id)
       
        const updatePatient = {name, lastName, email, password, phone, address, phoneEmergencyContacts, isVerified, loginAttempts, timeOut}
        if(req.file){
            await cloudinary.uploader.destroy(patientFound.profile_id)

            updatePatient.image = req.file.path,
            updatePatient.profile_id = req.file.filename
        }
        await patientFound.findByIdAndUpdate(req.params.id, updatePatient, {new: true})
        return res.status(200).json({message: "Actualizado correctamente"})
    } catch (error) {
        return res.status(500).json({message: "Intenal sever error"})
    }
}

patientsContoller.deletePatient = async (req, res) =>{
    try {
        const patientFound = await patientsModel.findById(req.params.id)

        await cloudinary.uploader.destroy(patientFound.profile_id)

        await patientsModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({message: "Eliminado correctamente"})
    } catch (error) {
        return res.status(500).json({message: "Intenal sever error"})
    }
}
export default patientsContoller