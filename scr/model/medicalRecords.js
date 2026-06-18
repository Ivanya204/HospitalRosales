/*
patient_id
diagnosis
medications [{ medicineName }]
medicalNotes
*/

import mongoose, {Schema, model} from "mongoose";

const medicalRecordsSchema = new Schema ({
    patient_id: {type: mongoose.Schema.Types.ObjectId,
        ref: "Patients"
    },
    diagnosis: {type: String},
    medicalNotes: {type:String},
    medications: [
        {
            medicineName:{type: String}
        }
    ]
},
{
    timestamps: true,
    strict: false
})

export default model ("medicalRecords", medicalRecordsSchema)