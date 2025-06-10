import { pool } from '../db.js';
export class Greet {
    static async findAll() {
        const [rows] = await pool.query('SELECT id, greet, language FROM regards');
        return rows;
    }
    static async stats() {
        const [totalResult] = await pool.query('SELECT COUNT(*) as total FROM regards');
        const total = totalResult[0].total;
        const [countByLanguage] = await pool.query('SELECT language, COUNT(*) as count FROM regards GROUP BY language');
        return { total, countByLanguage };
    }
    static async findById(id) {
        const [rows] = await pool.query('SELECT id, greet, language FROM regards WHERE id = ?', [id]);
        return rows[0];
    }
    static async create(param) {
        const [result] = await pool.query('INSERT INTO regards (greet, language) VALUES (?, ?)', [param.greet, param.language]);
        const insertId = result.insertId;
        const [rows] = await pool.query('SELECT id, greet, language FROM regards WHERE id = ?', [insertId]);
        return rows[0];
    }
    static async delete(id) {
        const [result] = await pool.query('DELETE FROM regards WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
    static async update(id, param) {
        const [result] = await pool.query('UPDATE regards SET greet = ?, language = ? WHERE id = ?', [param.greet, param.language, id]);
        return result.affectedRows > 0;
    }
}
