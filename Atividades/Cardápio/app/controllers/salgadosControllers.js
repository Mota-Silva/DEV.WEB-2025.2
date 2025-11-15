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
            const { nome, preco, disponivel } = req.body;
            
            if (!nome || !preco || !disponivel) {
                return res.status(400).json({ 
                    error: 'Todos os campos são obrigatórios (nome, preco, disponivel)' 
                });
            }
            const newSalgados = await Salgados.create(nome, preco, disponivel);
            res.status(201).json(newSalgados);
        } catch (error) {
            console.error('Erro ao criar salgado:', error);
            res.status(500).json({ error: 'Erro ao criar novo salgado', details: error.message });
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