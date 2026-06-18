import medicalAppointments from "../model/medicalAppointments.js";
const medicalAppointmentsController ={}

medicalAppointmentsController.getAppointment = async (req, res) =>{
    try {
        const appointment = await medicalAppointments.find()
        return res.status(200).json(appointment)
    } catch (error) {
        return res.status(500).json({message: "Intenal sever error"})
    }
}

medicalAppointmentsController.insertAppointment = async(req, res)=>{
    try {
        let{patient_id, specialty_id, appointmentDate ,reason ,status, observations} = req.body
        const newAppointment = new medicalAppointments({patient_id, specialty_id, appointmentDate ,reason ,status, observations})
        await newAppointment.save()
        return res.status(201).json({message: "Guardado exitosamente"})
    } catch (error) {
        return res.status(500).json({message: "Intenal sever error"})
    }
}

medicalAppointmentsController.updateAppointment = async (req, res)=>{
    try {
        let{patient_id, specialty_id, appointmentDate ,reason ,status, observations} = req.body
        const updated = await medicalAppointments.findByIdAndUpdate(
            req.params.id,
            {patient_id, specialty_id, appointmentDate ,reason ,status, observations},
            {new:true}
        )
        if(!updated){
            return res.status(404).json({message: "No encontrado"})
        }
        return res.status(200).json({message: "Actualizado correctamente"})
    } catch (error) {
        return res.status(500).json({message: "Intenal sever error"})
    }
}

medicalAppointmentsController.deleteAppointment = async (req, res)=>{
    try {
        const deleted = await medicalAppointments.findByIdAndDelete(req.params.id)
        if(!deleted){
            return res.status(404).json({message: "No encontrado"})
        }
        return res.status(200).json({message: "Actualizado correctamente"})
    } catch (error) {
        return res.status(500).json({message: "Intenal sever error"})
    }
}

export default medicalAppointmentsController