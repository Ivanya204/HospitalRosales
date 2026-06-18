import medicalSpecialtiesModel from "../model/medicalSpecialties.js";
const medicalSpecialtiesController   = {}

medicalSpecialtiesController.getMedicalSpecialties = async (req, res) =>{
    try {
        const medical = await medicalAppointmentsModel.find();
        return res.status(200).json(medical)
    } catch (error) {
         return res.status(500).json({message: "Intenal sever error"})
    }
}

medicalSpecialtiesController.insertMedicalSpecialties = async (req, res) =>{
    try {
        let{specialtyName,
        description,
        isAvailable} = req.body;
        const newMedicalSpecialties = new medicalSpecialtiesModel({specialtyName,
        description,
        isAvailable})
        await newMedicalSpecialties.save()
        return res.status(201).json({message: "Guardado exitosamente"})
    } catch (error) {
        return res.status(500).json({message: "Intenal sever error"})
    }
}
medicalSpecialtiesController.updateMedicalSpecialties = async (req, res)=>{
    try {
        let{specialtyName,
    description,
    isAvailable} = req.body;

    const updatedMedicalSpeciality = await medicalSpecialtiesModel.findByIdAndUpdate(
        req.params.id,
        {specialtyName,
        description,
        isAvailable},
        {new: true}
    )
    if (!updatedMedicalSpeciality){
        return res.status(404).json({message: "No encontrado"})
    }
    return res.status(200).json({message: "Actualizado correctamente"})
    } catch (error) {
        return res.status(500).json({message: "Intenal sever error"})
    }
}

medicalSpecialtiesController.deleteMedicalSpeciality = async (req, res)=>{
    try {
        const deleted = await medicalSpecialtiesModel.findByIdAndDelete(req.params.id)
        if(!deleted){
            return res.status(404).json({message: "No encontrado"})
        }
        return res.status(200).json({message: "Eliminado correctamente"})
    } catch (error) {
        return res.status(500).json({message: "Intenal sever error"})
    }
}

export default medicalSpecialtiesController