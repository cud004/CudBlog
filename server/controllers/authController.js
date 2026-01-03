import authService from '../services/authService.js';
import { asyncHandler } from '../utils/errorHandler.js';
import StatusCodes from 'http-status-codes';


export const register = asyncHandler(async (req, res) => {
    const result = await authService.register(req.body);

    res.status(StatusCodes.CREATED).json({
        success: true,
        message: 'User registered successfully',
        data: result
    });
});


export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const result = await authService.login(email, password);

    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Login successful',
        data: result
    });
});

export const refreshToken = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;
    const result = await authService.refreshAccessToken(refreshToken);

    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Token refreshed successfully',
        data: result
    });
});

export const logout = asyncHandler(async (req, res) => {
    await authService.logout(req.user.id);

    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Logout successful'
    });
});


export const getProfile = asyncHandler(async (req, res) => {
    const profile = await authService.getUserProfile(req.user.id);

    res.status(StatusCodes.OK).json({
        success: true,
        data: profile
    });
});


export const changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    await authService.changePassword(req.user.id, currentPassword, newPassword);

    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Password changed successfully'
    });
});

