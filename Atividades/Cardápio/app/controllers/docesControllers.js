const Doces = require('../models/docesModels');

const docesController = {
    getAllDoces: async (req, res) => {
        try {
            const doces = await Doces.getAll();
            res.json(doces);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter doces' });
        }
    },
     
    getDocesById: async (req, res) => {
        try {
            const { id } = req.params;
            const doces = await Doces.getById(id);
            if (doces) {
                res.json(doces);
            } else {
                res.status(404).json({ error: 'Doce não encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter doce' });
        }   
    },

    createDoces: async (req, res) => {
        try {
            const { id, nome, preco, disponivel } = req.body;
            
            if (!nome || preco === undefined || preco === null || preco === '') {
                return res.status(400).json({ 
                    error: 'Campos obrigatórios: nome, preco' 
                });
            }

            // Se id foi fornecido, faz update; senão, cria novo
            if (id) {
                const updated = await Doces.update(id, nome, preco, disponivel !== undefined ? disponivel : true);
                return res.json(updated);
            }

            const newDoces = await Doces.create(nome, preco, disponivel !== undefined ? disponivel : true);
            res.status(201).json(newDoces);
        } catch (error) {
            console.error('Erro ao criar/atualizar doce:', error);
            res.status(500).json({ error: 'Erro ao processar doce', details: error.message });
        }
    },

    updateDoces: async (req, res) => {
        try {
            const { id } = req.params;
            const { nome, preco, disponivel } = req.body;
            const updatedDoces = await Doces.update(id, nome, preco, disponivel); 
            if (updatedDoces) {
                res.json(updatedDoces);
            } else {
                res.status(404).json({ error: 'Doce não encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar doce' });
        }
    },

    deleteDoces: async (req, res) => {
        try {
            const { id } = req.params;
            const success = await Doces.delete(id);
            if (success) {
                res.json({ message: 'Doce deletada com sucesso' });
            } else {
                res.status(404).json({ error: 'Doce não encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar doce' });
        }
    },
};

module.exports = docesController;