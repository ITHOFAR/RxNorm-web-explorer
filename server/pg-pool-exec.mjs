//based on tutorial from Steve Harris (my dad) on using pg-pool with postgreSQL and express
import {Pool} from 'pg-pool';
import {Client, QueryConfig, QueryResult} from 'pg';

let connPool = null;

function pool() {
    if (!connPool) {
        throw new Error("Attempted to use connection pool before initialization");
    }
    return connPool;
}

export function createPool() {
    const env = process.env;

    if (!env.DB_DATABASE || !env.DB_USER || !env.DB_PASSWORD) {
        throw new Error("Missing required database connection values");
    }

    connPool = new Pool({
        database: env.DB_DATABASE,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        host: env.DB_HOST || 'localhost',
        port: parseInt(env.DB_PORT, 10) || 5432, //default to 5432 if not provided. pg-setup-cims provides 54321
        max: parseInt(env.DB_POOL_MAX_SIZE, 10) || 4,
        connectionTimeoutMillis: 1000, // error after 1 second if no connection
    });

    connPool.on('error', (err, data) => {
        console.error('pg-pool: Encountered unexpected error on idle client', err);
    });
}

export async function closePool() {
    console.log("Closing database connection pool");
    await pool().end();
}