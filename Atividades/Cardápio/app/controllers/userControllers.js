const User = require('../models/userModels');

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.getAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter usuários' });
        }
    },
     
    getUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.getById(id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: 'Usuário não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter usuário' });
        }   
    },

    createUser: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            
            if (!name || !email || !password) {
                return res.status(400).json({ 
                    error: 'Todos os campos são obrigatórios (name, email, password)' 
                });
            }
            const newUser = await User.create(name, email, password);
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            res.status(500).json({ error: 'Erro ao criar novo usuário', details: error.message });
        }
    },

    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, email, password } = req.body;
            const updatedUser = await User.update(id, name, email, password); 
            if (updatedUser) {
                res.json(updatedUser);
            } else {
                res.status(404).json({ error: 'Usuário não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar usuário' });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            const success = await User.delete(id);
            if (success) {
                res.json({ message: 'Usuário deletado com sucesso' });
            } else {
                res.status(404).json({ error: 'Usuário não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar usuário' });
        }
    },
};

module.exports = userController;