import medicalEquipmentModel from "../model/medicalEquipment.js";
import {v2 as cloudinary} from "cloudinary"
const medicalEquipmentController ={}

medicalEquipmentController.getMedicalEquipment = async (req, res )=>{
    try {
        const equipment = await medicalEquipmentModel.find()
        return res.status(200).json(equipment)
    } catch (error) {
        return res.status(500).json({message: "Intenal sever error"})
    }
}

medicalEquipmentController.insertMedicalEquipment = async (req, res) =>{
    try {
        let{
            equipmentName,
            description,
            brand,
            model,
            purchaseDate,
            maintenanceDate,
            condition,
            image,
            status,
            isAvailable,
        }= req.body

        const newMedicalEquipment = new medicalEquipmentModel({
            equipmentName,
            description,
            brand,
            model,
            purchaseDate,
            maintenanceDate,
            condition,
            image: req.file.path,
            profile_id: req.file.path,
            status,
            isAvailable,
        })
        await newMedicalEquipment.save()
        return res.status(200).json({message: "Actualizado correctamente"})
    } catch (error) {
        return res.status(500).json({message: "Intenal sever error"})
    }
}

medicalEquipmentController.updateMedicalEquipment = async (req, res)=>{
    try {
        let{
            equipmentName,
            description,
            brand,
            model,
            purchaseDate,
            maintenanceDate,
            condition,
            status,
            isAvailable,
        } = req.body

        const equipmentFound = await medicalEquipmentModel.findById(req.params.id)

        const updateEquipment = {
            equipmentName,
            description,
            brand,
            model,
            purchaseDate,
            maintenanceDate,
            condition,
            status,
            isAvailable,
        }
        if(req.file){
            await cloudinary.uploader.destroy(patientFound.profile_id)
            
            updateEquipment.image = req.file.path,
            updateEquipment.profile_id = req.file.filename
        }
        await equipmentFound.findByIdAndUpdate(req.params.id, updateEquipment, {new: true})
        return res.status(200).json({message: "Actualizado correctamente"})
    } catch (error) {
        return res.status(500).json({message: "Intenal sever error"})
    }
}

medicalEquipmentController.deleteMedicalEquipment = async(req, res)=>{
    try {
        const equipmentFound = await medicalEquipmentModel.findById(req.params.id)
        await cloudinary.uploader.destroy(equipmentFound.profile_id)

        await medicalEquipmentModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({message: "Eliminado correctamente"})
    } catch (error) {
        return res.status(500).json({message: "Intenal sever error"})
    }
}