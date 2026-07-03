import dotenv from "dotenv";
import pkg from "pg";


dotenv.config();

const { Pool, types } = pkg;

types.setTypeParser(1072, (value) => value); // Parse numeric values as strings

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    }
})

pool.on('connect',()=>{
    console.log('Database connected to Neon postgres successfully');
})

pool.on('error',(err)=>{
    console.error('Database connection error:', err);
});

export default pool;