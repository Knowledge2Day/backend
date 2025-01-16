import express from 'express';
import {  createContactMessage,
    getVisitorCount,
    incrementVisitorCount, createLiveDemo ,registerForCourse,sendOtp, verifyOtpAndRegister,sendOtpToUser, verifyAndRegister,getUsers,getLiveDemos,getAllContacts,loginUser} from '../controllers/contactController.js';
// import { getVisitorCount, incrementVisitorCount } from '../controllers/visitorController.js';


const router = express.Router();

router.post('/contact', createContactMessage);
router.get('/visitorCount', getVisitorCount);
router.post('/incrementVisitorCount', incrementVisitorCount);
router.post('/live-demo', createLiveDemo);
router.post('/register', registerForCourse);

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtpAndRegister);

router.post('/send', sendOtpToUser);
router.post('/verify', verifyAndRegister);

router.get("/users", getUsers);
router.get('/live-demos', getLiveDemos);
router.get('/contacts', getAllContacts);

router.post('/login', loginUser);




export default router;
