import express from 'express';
import { googleAuth, googleCallback } from '../controllers/authController.js';
import  verifying  from '../../utils/tokens/veryfing.js';
const router = express.Router();

router.get('/google', googleAuth);

router.get('/google/callback', googleCallback);


router.get('/dashboard' ,verifying, (req, res) => {
    
    res.send('Welcome to the dashboard');
});

export default router;