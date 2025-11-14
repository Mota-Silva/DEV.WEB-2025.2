const User = require('../models/userModel');

const userControllers = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.getAll();
            res.json(users);
        }   catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
     
    getUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.getById(id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }   
    },

    createUser: async (req, res) => {
        try {
            const { name, email } = req.body;
            const newUser = await User.create(name, email);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, email } = req.body;
            const updatedUser = await User.update(id, name, email);
            if (updatedUser) {
                res.json(updatedUser);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedUser = await User.delete(id);
            if (deletedUser) {
                res.json(deletedUser);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = userControllers;