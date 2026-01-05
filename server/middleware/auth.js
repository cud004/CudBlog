import jwt from "jsonwebtoken";
import { AuthenticationError } from "../utils/errorHandler.js";
import User from "../models/User.js";

// Protect routes - verify JWT token
export const auth = async (req, res, next) => {
    try {
        let token;

        // Get token from header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.headers.authorization) {
            token = req.headers.authorization;
        }
        
        if (!token) {
            throw new AuthenticationError('Please login to access this resource');
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from token
        req.user = await User.findById(decoded.id).select('-password');
        
        if (!req.user) {
            throw new AuthenticationError('User not found');
        }

        if (!req.user.isActive) {
            throw new AuthenticationError('Account is deactivated');
        }

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            next(new AuthenticationError('Invalid token'));
        } else if (error.name === 'TokenExpiredError') {
            next(new AuthenticationError('Token expired, please login again'));
        } else {
            next(error);
        }
    }
};

// Authorize roles
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new AuthenticationError(`Role ${req.user.role} is not authorized to access this resource`);
        }
        next();
    };
};

export default auth;