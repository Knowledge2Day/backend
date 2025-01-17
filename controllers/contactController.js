import asyncHandler from 'express-async-handler';
import Contact from '../models/Contact.js';
import Visitor from '../models/visitor.js';
import Registration from "../models/Registration.js";
import LiveDemo1 from '../models/LiveDemo.js';
import { v4 as uuidv4 } from 'uuid';
import Login from '../models/LoginMoadal.js';




export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await Login.findOne({ email });

    // If user not found or password mismatch
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // If successful, send a success response
    return res.status(200).json({ message: 'Login successful', redirect: '/blank' });

  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};




















import User from "../models/User.js";
import nodemailer from "nodemailer";

// Generate and send OTP
export const sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
    });

    const otpExpires = new Date(Date.now() + 5 * 60000); // 5 minutes
    await User.updateOne({ email }, { otp, otpExpires }, { upsert: true });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

// Verify OTP and store user data
export const verifyOtpAndRegister = async (req, res) => {
  const { email, otp, name, education, passOutYear, contact, courseName } = req.body;

  try {
    // Step 1: Find the user and verify the OTP
    const user = await User.findOne({ email, otp, otpExpires: { $gte: Date.now() } });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Step 2: Create a new record with the provided data
    await User.create({
      name,
      email,
      education,
      passOutYear,
      contact,
      courseName,
      otp: null,          // OTP is no longer needed after verification
      otpExpires: null,    // OTP expiry is no longer needed
    });

    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};


export const sendOtpToUser = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
    });

    const otpExpires = new Date(Date.now() + 5 * 60000); // OTP expires in 5 minutes
    await LiveDemo1.updateOne({ email }, { otp, otpExpires }, { upsert: true });

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

// Verify OTP and register user
export const verifyAndRegister = async (req, res) => {
  const { name, email, contact, course, date, time, otp } = req.body;

  try {
    // Step 1: Find the existing record with matching email and valid OTP
    const existingRecord = await LiveDemo1.findOne({
      email,
      otp,
      otpExpires: { $gte: Date.now() },
    });

    if (!existingRecord) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Step 2: Create a new record with the provided data
    await LiveDemo1.create({
      name,
      email,
      contact,
      course,
      date,
      time,
      otp: null,          // No need to store OTP in the new record
      otpExpires: null,    // No need to store OTP expiry in the new record
    });

    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};













// @desc    Create a new contact message
// @route   POST /api/contact
// @access  Public
export const createContactMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    res.status(400);
    throw new Error('Please fill all fields');
  }

  const contact = new Contact({
    name,
    email,
    subject,
    message,
  });

  const createdContact = await contact.save();
  res.status(201).json(createdContact);
});


export const getVisitorCount = asyncHandler(async (req, res) => {
  const visitor = await Visitor.findOne({ name: 'localhost' });

  if (!visitor) {
    res.status(404).json({ message: 'Visitor count not found' });
  } else {
    res.json(visitor);
  }
});

// Increment the visitor count and add the IP if it's new
export const incrementVisitorCount = asyncHandler(async (req, res) => {
  const ipAddress = req.headers['x-forwarded-for'] || req.ip;
  console.log('Visitor IP Address:', ipAddress); // Log to check IP

  let visitor = await Visitor.findOne({ name: 'localhost' });

  if (!visitor) {
    visitor = new Visitor({
      name: 'localhost',
      count: 1,
      ips: [ipAddress],
    });
  } else {
    if (!Array.isArray(visitor.ips)) {
      visitor.ips = [];
    }

    console.log('Current IPs:', visitor.ips); // Log the current IPs

    if (!visitor.ips.includes(ipAddress)) {
      visitor.count += 1;
      visitor.ips.push(ipAddress);
    }
  }

  try {
    await visitor.save();
    res.json(visitor);
  } catch (error) {
    console.error('Error saving visitor data:', error);
    res.status(500).json({ message: 'Error saving visitor data' });
  }
});

export const createLiveDemo = async (req, res) => {
  try {
    const { tech, date, time, name, email, contact } = req.body;

    const liveDemo = new LiveDemo({ tech, date, time, name, email, contact });
    await liveDemo.save();

    res.status(201).json({ message: 'Live demo registered successfully!' });
  } catch (error) {
    res.status(400).json({ message: 'Error registering for the live demo', error });
  }
};


export const registerForCourse = async (req, res) => {
  const { name, education, passOutYear, email, contact, courseName } = req.body;

  try {
    // Validate required fields
    if (!name || !education || !passOutYear || !email || !contact || !courseName) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new registration entry
    const newRegistration = new Registration({
      name,
      education,
      passOutYear,
      email,
      contact,
      courseName, // Store the course name along with other details
    });

    // Save the registration to the database
    await newRegistration.save();

    // Send success response
    return res.status(201).json({
      message: "Registration successful",
      registration: newRegistration,
    });
  } catch (error) {
    console.error(error);
    // Send error response
    return res.status(500).json({
      message: "Error registering for the course",
      error: error.message,
    });
  }
};


export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLiveDemos = async (req, res) => {
  try {
    const liveDemos = await LiveDemo1.find();
    res.status(200).json(liveDemos);
  } catch (error) {
    console.error("Error fetching live demos:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // Sorting by the createdAt field in descending order
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
