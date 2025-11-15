const pool = require('../../config.js');

const Salgados = {
    getAll: async () => {
        const result = await pool.query('SELECT * FROM salgados');
        return result.rows;
    },

    getById: async (id) => {
        const result = await pool.query('SELECT * FROM salgados WHERE id = $1', [id]);
        return result.rows[0];
    },

    create: async (nome, preco, disponivel) => {
        const result = await pool.query(
            'INSERT INTO salgados (nome, preco, disponivel) VALUES ($1, $2, $3) RETURNING *',
            [nome, preco, disponivel]
        );
        return result.rows[0];
    },

    update: async (id, nome, preco, disponivel) => {
        const result = await pool.query(
            'UPDATE salgados SET nome = $1, preco = $2, disponivel = $3 WHERE id = $4 RETURNING *',
            [nome, preco, disponivel, id]
        );
        return result.rows[0];
    },

    delete: async (id) => {
        const result = await pool.query('DELETE FROM salgados WHERE id = $1', [id]);
        return result.rowCount > 0;
    },
};

module.exports = Salgados;
