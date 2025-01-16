const users = require('./UserData');
const httpStatus = require('../httpStatus');
const bcrypt = require('bcryptjs');

const getAllUsers = (req, res) => {
    res.send({ Status: httpStatus.SUCCESS, Data: users });
};

const Register = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send({ Status: httpStatus.RegisterError, message: 'Username and password are required' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { username, password: hashedPassword };
        users.users.push(newUser);
        res.status(201).send({ Status: httpStatus.SUCCESS, Data: newUser });
    } catch (error) {
        res.status(500).send({ Status: httpStatus.ServerError, message: 'An error occurred during registration' });
    }
};

const Login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send({ Status: httpStatus.LoginError, message: 'Username and password are required' });
        }
        const user = users.users.find((u) => u.username === username);
        if (!user) {
            return res.status(404).send({ Status: httpStatus.LoginError, message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ Status: httpStatus.LoginError, message: 'Invalid password' });
        }
        res.status(200).send({ Status: httpStatus.SUCCESS, message: 'Login successful' });
    } catch (error) {
        res.status(500).send({ Status: httpStatus.ServerError, message: 'An error occurred during login' });
    }
};

module.exports = {
    getAllUsers,
    Register,
    Login,
};
