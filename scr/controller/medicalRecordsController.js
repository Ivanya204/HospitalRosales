import medicalRecordsModel from "../model/medicalRecords.js";
const medicalRecordsController = {}

medicalRecordsController.getMedicalRecords = async ( req, res) =>{
    try {
        const records = await medicalRecordsModel.find();
        return res.status(200).json(records)
    } catch (error) {
        return res.status(500).json({message: "Intenal sever error"})
    }
}
medicalRecordsController.insertMedicalRecords = async (req, res) =>{
    try {
        let {patient_id,
        diagnosis,
        medications,
        medicalNotes} = req.body
        const newMedicalRecords = new medicalRecordsModel({patient_id,
        diagnosis,
        medications,
        medicalNotes})

        await newMedicalRecords.save()
        return res.status(201).json({message: "Guardado exitosamente"})
    } catch (error) {
        return res.status(500).json({message: "Intenal sever error"})
    }
}

medicalRecordsController.updateMedicalRecords = async (req, res)=>{
    try {
        let {patient_id,
        diagnosis,
        medications,
        medicalNotes} = req.body

    const updated = await medicalRecordsModel.findByIdAndUpdate(
        req.params.id,
        {patient_id,
        diagnosis,
        medications,
        medicalNotes},
        {new: true}
    )

    if(!updated){
        return res.status(404).json({message: "No encontrado"})
    }

    return res.status(200).json({message: "Actualizado correctamente"})
    } catch (error) {
        return res.status(500).json({message: "Intenal sever error"})
    }
}

medicalRecordsController.deleteMedicalRecords = async (req, res)=>{
    try {
        const deleted = await medicalRecordsModel.findByIdAndDelete(req.params.id)
        if(!deleted){
            return res.status(404).json({message: "No encontrado"})
        }
        return res.status(200).json({message: "Actualizado correctamente"})
    } catch (error) {
        return res.status(500).json({message: "Intenal sever error"})
    }
}