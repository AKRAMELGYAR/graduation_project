import jwt from 'jsonwebtoken';
import {User} from '../../user/model/userModel.js';

const verifying = async(req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const cuurentUser = await User.findById(decoded.id);
        if (!cuurentUser) {
            return res.status(401).json({ message: 'user not found' });
        }
        req.user = cuurentUser;
        
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};
export default verifying;
