const pool = require('../../config.js');

let _salgados = [];
let _nextIdS = 1;

const Salgados = {
    getAll: async () => {
        try {
            const result = await pool.query('SELECT * FROM salgados');
            return result.rows;
        } catch (err) {
            return _salgados;
        }
    },

    getById: async (id) => {
        try {
            const result = await pool.query('SELECT * FROM salgados WHERE id = $1', [id]);
            return result.rows[0];
        } catch (err) {
            return _salgados.find(s => String(s.id) === String(id));
        }
    },

    create: async (nome, preco, disponivel) => {
        try {
            const result = await pool.query(
                'INSERT INTO salgados (nome, preco, disponivel) VALUES ($1, $2, $3) RETURNING *',
                [nome, preco, disponivel]
            );
            return result.rows[0];
        } catch (err) {
            const newItem = { id: _nextIdS++, nome, preco: Number(preco), disponivel: !!disponivel };
            _salgados.push(newItem);
            return newItem;
        }
    },

    update: async (id, nome, preco, disponivel) => {
        try {
            const result = await pool.query(
                'UPDATE salgados SET nome = $1, preco = $2, disponivel = $3 WHERE id = $4 RETURNING *',
                [nome, preco, disponivel, id]
            );
            return result.rows[0];
        } catch (err) {
            const idx = _salgados.findIndex(s => String(s.id) === String(id));
            if (idx === -1) return null;
            _salgados[idx] = { ..._salgados[idx], nome, preco: Number(preco), disponivel: !!disponivel };
            return _salgados[idx];
        }
    },

    delete: async (id) => {
        try {
            const result = await pool.query('DELETE FROM salgados WHERE id = $1', [id]);
            return result.rowCount > 0;
        } catch (err) {
            const before = _salgados.length;
            _salgados = _salgados.filter(s => String(s.id) !== String(id));
            return _salgados.length < before;
        }
    },
};

module.exports = Salgados;
