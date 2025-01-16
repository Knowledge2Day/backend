import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import the cors package
import connectDB from './config/db.js';
import routes from './routes/route.js';
import cookieParser from 'cookie-parser';

dotenv.config();
connectDB();

const app = express();

// Use the cors middleware
app.use(cors({
  origin:true,
  credentials:true
}));

app.use(cookieParser());
app.use(express.json());

app.use(routes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
