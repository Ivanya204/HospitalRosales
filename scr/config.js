import dotenv from "dotenv"

dotenv.config()

export const config = {
    db :{URI: process.env.DB_URI},
    JWT:{secret: process.env.JWT_Secret_Key},
    email : { user_email : process.env.USER_EMAIL, user_password : process.env.USER_PASSWORD},
    cloudinary : {cloudinary_cloud_name : process.env.CLOUDINAY_CLOUD_NAME,
        cloudinary_cloud_key : process.env.CLOUDINARY_CLOUD_KEY,
        cloudinary_api_secret : process.env.CLOUDINARY_API_SECRET
    }
}

