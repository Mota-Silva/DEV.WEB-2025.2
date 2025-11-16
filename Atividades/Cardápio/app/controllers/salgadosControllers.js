const Salgados = require('../models/salgadosModels');

const salgadosController = {
    getAllSalgados: async (req, res) => {
        try {
            const salgados = await Salgados.getAll();
            res.json(salgados);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter salgados' });
        }
    },
     
    getSalgadosById: async (req, res) => {
        try {
            const { id } = req.params;
            const salgados = await Salgados.getById(id);
            if (salgados) {
                res.json(salgados);
            } else {
                res.status(404).json({ error: 'Salgado não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter salgado' });
        }   
    },

    createSalgados: async (req, res) => {
        try {
            const { id, nome, preco, disponivel } = req.body;
            
            if (!nome || preco === undefined || preco === null || preco === '') {
                return res.status(400).json({ 
                    error: 'Campos obrigatórios: nome, preco' 
                });
            }

            if (id) {
                const updated = await Salgados.update(id, nome, preco, disponivel !== undefined ? disponivel : true);
                return res.json(updated);
            }

            const newSalgados = await Salgados.create(nome, preco, disponivel !== undefined ? disponivel : true);
            res.status(201).json(newSalgados);
        } catch (error) {
            console.error('Erro ao criar/atualizar salgado:', error);
            res.status(500).json({ error: 'Erro ao processar salgado', details: error.message });
        }
    },

    updateSalgados: async (req, res) => {
        try {
            const { id } = req.params;
            const { nome, preco, disponivel } = req.body;
            const updatedSalgados = await Salgados.update(id, nome, preco, disponivel); 
            if (updatedSalgados) {
                res.json(updatedSalgados);
            } else {
                res.status(404).json({ error: 'Salgado não encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar salgado' });
        }
    },

    deleteSalgados: async (req, res) => {
        try {
            const { id } = req.params;
            const success = await Salgados.delete(id);
            if (success) {
                res.json({ message: 'Salgado deletado com sucesso' });
            } else {
                res.status(404).json({ error: 'Salgado não encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar salgado' });
        }
    },
};

module.exports = salgadosController;