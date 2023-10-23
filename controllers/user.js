import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const user = await User.find({})
        res.json({
            success: true,
            message: "registered successfullyyy",
            user,
        })
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email }).select("+password");
        if (!user) return next(new ErrorHandler("Invalid Email or password", 400))

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(404).json({
                success: false,
                message: "Invalid Email or password"
            })
        }
        sendCookie(user, res, `welcome back ${user.name}`, 201)
    } catch (error) {
        next(error)
    }
}


export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) return next(new ErrorHandler("User already exist", 400))

        const hashedPassword = await bcrypt.hash(password, 10)
        user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        sendCookie(user, res, "Registered Successfully", 201)
    } catch (error) {
        next(error)
    }

}


export const getMyProfile = (req, res) => {

    res.status(201).json({
        success: true,
        user: req.user,
    })
}

export const logout = (req, res) => {


    res.status(201).cookie("token", "", { expires: new Date(Date.now()) }).json({
        success: true,
        user: req.user,
    })
}
