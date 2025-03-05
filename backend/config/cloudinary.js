import { v2 as cloudinary } from 'cloudinary';

// Configuration
const connectCloudinary = async()=>{
    cloudinary.config({ 
        cloud_name:process.env.CLOUD_NAME, 
        api_key:process.env.API_KEY, 
        api_secret:process.env.API_SECRET 
    });
    console.log('connected cloudinary')
}

export default connectCloudinary;