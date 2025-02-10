import passport from 'passport';
import jwt from 'jsonwebtoken';
import * as userService from "../service/authService.js";
import asyncHandler from "../../utils/globalErrorHandling/asyncHandler.js";

export const signUp = asyncHandler(userService.signUp);
export const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

export const googleCallback = (req, res, next) => {
    passport.authenticate('google', { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        if (!user._id) {
            return res.status(400).json({ message: "User ID not found" });
        }

        const token = jwt.sign({ id: user._id , email : user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,    
            // secure: true, production only
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000, // 1d
        });


        res.status(200).json({ message: 'Authentication successful', user });
    })(req, res, next);
};
