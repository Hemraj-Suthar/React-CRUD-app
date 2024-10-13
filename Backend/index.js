import express from 'express';
import cors from 'cors';
import path from 'path';
import connectDB from './Database/connectDB.js';
import router from './routes/route.js';
import employee from './model/schema.js';
// import dotenv from 'dotenv';
// dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// CORS Policy
app.use(cors());

// JSON
app.use(express.json());

app.use('/uploads', express.static(path.join('uploads')));

// Database connection
connectDB();

// Load Routes
app.use("/api", router);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})