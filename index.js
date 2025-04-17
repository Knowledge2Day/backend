import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import the cors package
import connectDB from './config/db.js';
import routes from './routes/route.js';
import cookieParser from 'cookie-parser';
import enquiryRoutes from "./routes/enquiryRoutes.js";
import rtpdRoutes from "./routes/rtpdRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Use the cors middleware for handeling blocking way for server
app.use(cors({
  origin:true,
  credentials:true
}));

app.use(cookieParser());
app.use(express.json());

app.use(routes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/rtpd", rtpdRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});