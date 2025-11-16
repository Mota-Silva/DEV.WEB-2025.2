const pool = require('../../config.js');

// In-memory fallback store so the API can work without a database during development.
let _doces = [];
let _nextId = 1;

const Doces = {
    getAll: async () => {
        try {
            const result = await pool.query('SELECT * FROM doces');
            return result.rows;
        } catch (err) {
            return _doces;
        }
    },

    getById: async (id) => {
        try {
            const result = await pool.query('SELECT * FROM doces WHERE id = $1', [id]);
            return result.rows[0];
        } catch (err) {
            return _doces.find(d => String(d.id) === String(id));
        }
    },

    create: async (nome, preco, disponivel) => {
        try {
            const result = await pool.query(
                'INSERT INTO doces (nome, preco, disponivel) VALUES ($1, $2, $3) RETURNING *',
                [nome, preco, disponivel]
            );
            return result.rows[0];
        } catch (err) {
            const newItem = { id: _nextId++, nome, preco: Number(preco), disponivel: !!disponivel };
            _doces.push(newItem);
            return newItem;
        }
    },

    update: async (id, nome, preco, disponivel) => {
        try {
            const result = await pool.query(
                'UPDATE doces SET nome = $1, preco = $2, disponivel = $3 WHERE id = $4 RETURNING *',
                [nome, preco, disponivel, id]
            );
            return result.rows[0];
        } catch (err) {
            const idx = _doces.findIndex(d => String(d.id) === String(id));
            if (idx === -1) return null;
            _doces[idx] = { ..._doces[idx], nome, preco: Number(preco), disponivel: !!disponivel };
            return _doces[idx];
        }
    },

    delete: async (id) => {
        try {
            const result = await pool.query('DELETE FROM doces WHERE id = $1', [id]);
            return result.rowCount > 0;
        } catch (err) {
            const before = _doces.length;
            _doces = _doces.filter(d => String(d.id) !== String(id));
            return _doces.length < before;
        }
    },
};

module.exports = Doces;
