const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const validator = require('validator');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    const jwtKey = process.env.JWT_KEY;
    return jwt.sign({ _id }, jwtKey, { expiresIn: "3d" });
}

const registerUser = async (req, res) => {


    try {

        const { name, email, password } = req.body;

        /* login/sign-up logic */
        let user = await userModel.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists!" });
        }
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Email is not valid!" });
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Password isn't strong enough!" });
        }

        user = new userModel({ name, email, password });

        //encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        //save to database
        await user.save();

        const token = createToken(user._id);
        res.status(200).json({ _id: user, name, email, password, token })

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const loginUser = async (req, res) => {

    /*login logic*/
    const { email, password } = req.body;

    try {
        let user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password!" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid email or password!" });
        }

        const token = createToken(user._id);
        res.status(200).json({ _id: user._id, name: user.name, email, token });

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
};

const findUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await userModel.findById(userId);
        res.status(200).json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
const findAllUsers = async (req, res) => {

    try {
        const users = await userModel.find();
        res.status(200).json(users);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = { registerUser, loginUser, findUser, findAllUsers };