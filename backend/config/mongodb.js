import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}/ecommerce`);
        console.log('Database connected successfully!');
    } catch (error) {
        console.error('Database connection failed:', error.message);
    }
};

export default connectDb;
