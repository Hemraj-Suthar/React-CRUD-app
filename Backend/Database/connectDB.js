import mongoose from 'mongoose';

async function connectDB(){
    try {
        await mongoose.connect('mongodb://localhost:27017/EmployeeData');
        console.log('MongoDB connection established successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit process on connection failure
    }
}

export default connectDB;