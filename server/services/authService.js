import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { AuthenticationError, ConflictError, NotFoundError } from '../utils/errorHandler.js';

class AuthService {
    // Generate JWT Token
    generateToken(userId, email, role) {
        return jwt.sign(
            { id: userId, email, role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );
    }

    // Generate Refresh Token
    generateRefreshToken(userId) {
        return jwt.sign(
            { id: userId },
            process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );
    }

    // Register new user
    async register(userData) {
        const { name, email, password, role } = userData;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new ConflictError('Email already registered');
        }

        // Create new user
        const user = await User.create({
            name,
            email,
            password,
            role: role || 'user'
        });

        // Generate tokens
        const token = this.generateToken(user._id, user.email, user.role);
        const refreshToken = this.generateRefreshToken(user._id);

        // Save refresh token
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profileImage: user.profileImage
            },
            token,
            refreshToken
        };
    }

    // Login user
    async login(email, password) {
        // Find user and include password
        const user = await User.findOne({ email }).select('+password');
        
        if (!user) {
            throw new AuthenticationError('Invalid email or password');
        }

        // Check if user is active
        if (!user.isActive) {
            throw new AuthenticationError('Account is deactivated');
        }

        // Check password
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            throw new AuthenticationError('Invalid email or password');
        }

        // Update last login
        await user.updateLastLogin();

        // Generate tokens
        const token = this.generateToken(user._id, user.email, user.role);
        const refreshToken = this.generateRefreshToken(user._id);

        // Save refresh token
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profileImage: user.profileImage,
                lastLogin: user.lastLogin
            },
            token,
            refreshToken
        };
    }

    // Verify token
    verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw new AuthenticationError('Invalid or expired token');
        }
    }

    // Refresh access token
    async refreshAccessToken(refreshToken) {
        try {
            const decoded = jwt.verify(
                refreshToken,
                process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET
            );

            const user = await User.findById(decoded.id).select('+refreshToken');
            if (!user || user.refreshToken !== refreshToken) {
                throw new AuthenticationError('Invalid refresh token');
            }

            const newToken = this.generateToken(user._id, user.email, user.role);
            
            return { token: newToken };
        } catch (error) {
            throw new AuthenticationError('Invalid or expired refresh token');
        }
    }

    // Logout
    async logout(userId) {
        const user = await User.findById(userId);
        if (user) {
            user.refreshToken = undefined;
            await user.save({ validateBeforeSave: false });
        }
    }

    // Change password
    async changePassword(userId, currentPassword, newPassword) {
        const user = await User.findById(userId).select('+password');
        
        if (!user) {
            throw new NotFoundError('User not found');
        }

        const isPasswordCorrect = await user.comparePassword(currentPassword);
        if (!isPasswordCorrect) {
            throw new AuthenticationError('Current password is incorrect');
        }

        user.password = newPassword;
        await user.save();

        return { message: 'Password changed successfully' };
    }

    // Get user profile
    async getUserProfile(userId) {
        const user = await User.findById(userId);
        if (!user) {
            throw new NotFoundError('User not found');
        }

        return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage,
            lastLogin: user.lastLogin,
            createdAt: user.createdAt
        };
    }
}

export default new AuthService();

