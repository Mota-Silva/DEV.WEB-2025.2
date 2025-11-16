const Bebidas = require('../models/bebidasModels');

const bebidasController = {
    getAllBebidas: async (req, res) => {
        try {
            const bebidas = await Bebidas.getAll();
            res.json(bebidas);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter bebidas' });
        }
    },
     
    getBebidasById: async (req, res) => {
        try {
            const { id } = req.params;
            const bebidas = await Bebidas.getById(id);
            if (bebidas) {
                res.json(bebidas);
            } else {
                res.status(404).json({ error: 'Bebida não encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter bebida' });
        }   
    },

    createBebidas: async (req, res) => {
        try {
            const { id, nome, preco, disponivel } = req.body;
            
            if (!nome || preco === undefined || preco === null || preco === '') {
                return res.status(400).json({ 
                    error: 'Campos obrigatórios: nome, preco' 
                });
            }

            if (id) {
                const updated = await Bebidas.update(id, nome, preco, disponivel !== undefined ? disponivel : true);
                return res.json(updated);
            }

            const newBebidas = await Bebidas.create(nome, preco, disponivel !== undefined ? disponivel : true);
            res.status(201).json(newBebidas);
        } catch (error) {
            console.error('Erro ao criar/atualizar bebida:', error);
            res.status(500).json({ error: 'Erro ao processar bebida', details: error.message });
        }
    },

    updateBebidas: async (req, res) => {
        try {
            const { id } = req.params;
            const { nome, preco, disponivel } = req.body;
            const updatedBebidas = await Bebidas.update(id, nome, preco, disponivel); 
            if (updatedBebidas) {
                res.json(updatedBebidas);
            } else {
                res.status(404).json({ error: 'Bebida não encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar bebida' });
        }
    },

    deleteBebidas: async (req, res) => {
        try {
            const { id } = req.params;
            const success = await Bebidas.delete(id);
            if (success) {
                res.json({ message: 'Bebida deletada com sucesso' });
            } else {
                res.status(404).json({ error: 'Bebida não encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar bebida' });
        }
    },
};

module.exports = bebidasController;