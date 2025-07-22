


import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
dotenv.config();




cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});



const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = 'user_uploads';
    let resource_type = 'auto';

    
    if (file.fieldname === 'image') {
      folder = 'user_profiles';
      resource_type = 'image';
    } else if (file.fieldname === 'resume') {
      folder = 'user_resumes';
      resource_type = 'raw'; 
    }

    return {
      folder,
      resource_type, 
      public_id: `${Date.now()}-${file.originalname}`, 
      allowed_formats: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'], 
    };
  },
});

export { cloudinary, storage };













