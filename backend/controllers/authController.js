import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import { defaultCategories } from '../utils/defaultCategories.js';

const signToken = (userId) => {
    jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

const register = async (req, res) => {
    const { name , email, password, currency='USD' } = req.body;

    if(!name || !email || !password){
        return res.status(400).json({ message: 'Name, email and password are required' });
    }

    if(password.length < 7){
        return res.status(400).json({ message: 'Password must be at least 7 characters long' });
    }

    const clint = await pool.connect();
    try {
        const existingUser = await clint.query('SELECT id FROM users WHERE email = $1', [email]);
        if(existingUser.rows.length > 0){
            return res.status(400).json({ message: 'User already exists' });
        }

        await clint.query('BEGIN');

        const salt = await bcrypt.genSalt(10);
        const PasswordHash = await bcrypt.hash(password, salt);

        const newUser = await clint.query(
            `INSERT INTO users (name, email, password_hash, currency)
            VALUES ($1, $2, $3, $4) 
            RETURNING id, name, email, currency, created_at`,
            [name, email, PasswordHash, currency]
        );

        const user = newUser.rows[0];

        for(const cat of defaultCategories){
            await clint.query(
                `INSERT INTO categories (user_id, name, type, icon, color, is_default)
                values ($1, $2, $3, $4, $5, true)`,
                [user.id, cat.name, cat.type, cat.icon, cat.color]
            )
        }

        await clint.query('COMMIT');

        const token = signToken(user.id);
        res.status(201).json({ user, token});

    } catch (error) {
        await clint.query('ROLLBACK');
        console.error('register error:', error);
        res.status(500).json({ message: 'Server error' });
    } finally {
        clint.release();
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {

        const result = await pool.query('SELECT id, name, email, password_hash, currency FROM users WHERE email = $1', 
            [email]
        );

        if(result.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const token = signToken(user.id);
        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                currency: user.currency,
            }, 
            token,
        });


    } catch (error) {
        console.error('login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

const getMe = async (req, res) => {

    try {
            const result = await pool.query('SELECT id, name, email, currency, created_at FROM users WHERE id = $1',
            [req.userId]
        );

        if(result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json( result.rows[0]);
    } catch (error) {
        console.error('getMe error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



export { register, login, getMe };