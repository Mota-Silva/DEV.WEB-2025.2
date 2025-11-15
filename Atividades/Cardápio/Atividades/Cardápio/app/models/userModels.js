const pool = require('../../config.js');

const User = {
    getAll: async () => {
        const result = await pool.query('SELECT * FROM users');
        return result.rows;
    },

    getById: async (id) => {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0];
    },

    create: async (name, email, password) => {
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, password]
        );
        return result.rows[0];
    },

    update: async (id, name, email, password) => {
        const result = await pool.query(
            'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
            [name, email, password, id]
        );
        return result.rows[0];
    },

    delete: async (id) => {
        const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);
        return result.rowCount > 0;
    },
};

module.exports = User;
