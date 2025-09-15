"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.Signin = exports.registerUser = void 0;
// Get most recent chat for a user
const asyncHandler_1 = require("../utils/asyncHandler");
const user_model_1 = __importDefault(require("../models/user.model"));
const Apierror_1 = require("../utils/Apierror");
async function generateAccessTokenandRefreshToken(id) {
    try {
        const user = await user_model_1.default.findById(id);
        if (!user) {
            throw new Apierror_1.ApiError(404, "User not found");
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    }
    catch (error) {
        throw new Apierror_1.ApiError(500, "Something went wrong while generating refresh and access token");
    }
}
exports.registerUser = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { email, password, name, enrollment, batch, course, country } = req.body;
    const existedUser = await user_model_1.default.findOne({ email });
    if (existedUser) {
        throw new Apierror_1.ApiError(403, "User already exists");
    }
    const user = await user_model_1.default.create({
        email,
        password,
        name,
        batch,
        enrollment,
        course,
        country
    });
    // Remove password from response
    const createdUser = await user_model_1.default.findById(user._id).select("-password");
    if (!createdUser) {
        throw new Apierror_1.ApiError(500, "Something went wrong while registering the user");
    }
    // Generate tokens just like in Signin
    const { accessToken, refreshToken } = await generateAccessTokenandRefreshToken(user._id);
    const options = {
        httpOnly: true,
        secure: false,
    };
    return res.status(201)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json({
        token: accessToken,
        user: {
            email: createdUser.email,
            name: createdUser.name,
            enrollment: createdUser.enrollment,
            batch: createdUser.batch,
            course: createdUser.course,
            country: createdUser.country,
            createdAt: createdUser.createdAt
        },
        success: true,
        message: "User registered successfully"
    });
});
exports.Signin = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { email, password } = req.body;
    const loggedinUser = await user_model_1.default.findOne({ email });
    if (!loggedinUser) {
        throw new Apierror_1.ApiError(403, "User doesnot even exist");
    }
    const PasswordVerification = await loggedinUser.isPasswordCorrect(password);
    if (PasswordVerification == false) {
        throw new Apierror_1.ApiError(403, "Please enter the correct password");
    }
    const { accessToken, refreshToken } = await generateAccessTokenandRefreshToken(loggedinUser._id);
    const options = {
        httpOnly: true,
        secure: false,
    };
    return res.status(201).cookie('accessToken', accessToken, options).cookie('refreshToken', refreshToken, options).json({
        token: accessToken, user: {
            email: loggedinUser.email,
            name: loggedinUser.name,
        },
    });
});
const logoutUser = async (req, res) => {
    await user_model_1.default.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshToken: undefined
        }
    }, {
        new: true
    });
    const options = {
        httpOnly: true,
        secure: true
    };
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json("User logged out successfully");
};
exports.logoutUser = logoutUser;
//# sourceMappingURL=user.controller.js.map