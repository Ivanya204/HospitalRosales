import multer from "multer";
import {v2 as cloudinary} from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { config } from "dotenv";

cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_cloud_name,
    api_key: config.cloudinary.cloudinary_cloud_key,
    api_secret : config.cloudinary.cloudinary_api_secret
})

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: "HospitalRosales",
        allowed_formats: ["jpg", "png", "jpeg"]
    }
})

const upload = multer({storage})

export default upload