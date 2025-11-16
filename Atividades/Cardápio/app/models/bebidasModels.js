const pool = require('../../config.js');

let _bebidas = [];
let _nextIdB = 1;

const Bebidas = {
    getAll: async () => {
        try {
            const result = await pool.query('SELECT * FROM bebidas');
            return result.rows;
        } catch (err) {
            return _bebidas;
        }
    },

    getById: async (id) => {
        try {
            const result = await pool.query('SELECT * FROM bebidas WHERE id = $1', [id]);
            return result.rows[0];
        } catch (err) {
            return _bebidas.find(b => String(b.id) === String(id));
        }
    },

    create: async (nome, preco, disponivel) => {
        try {
            const result = await pool.query(
                'INSERT INTO bebidas (nome, preco, disponivel) VALUES ($1, $2, $3) RETURNING *',
                [nome, preco, disponivel]
            );
            return result.rows[0];
        } catch (err) {
            const newItem = { id: _nextIdB++, nome, preco: Number(preco), disponivel: !!disponivel };
            _bebidas.push(newItem);
            return newItem;
        }
    },

    update: async (id, nome, preco, disponivel) => {
        try {
            const result = await pool.query(
                'UPDATE bebidas SET nome = $1, preco = $2, disponivel = $3 WHERE id = $4 RETURNING *',
                [nome, preco, disponivel, id]
            );
            return result.rows[0];
        } catch (err) {
            const idx = _bebidas.findIndex(b => String(b.id) === String(id));
            if (idx === -1) return null;
            _bebidas[idx] = { ..._bebidas[idx], nome, preco: Number(preco), disponivel: !!disponivel };
            return _bebidas[idx];
        }
    },

    delete: async (id) => {
        try {
            const result = await pool.query('DELETE FROM bebidas WHERE id = $1', [id]);
            return result.rowCount > 0;
        } catch (err) {
            const before = _bebidas.length;
            _bebidas = _bebidas.filter(b => String(b.id) !== String(id));
            return _bebidas.length < before;
        }
    },
};

module.exports = Bebidas;
