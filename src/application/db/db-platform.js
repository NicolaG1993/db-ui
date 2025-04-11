import { Pool } from "pg";

const config = {
    connectionString: process.env.DATABASE_PLATFORM_URL,
};

let db;
if (!db) {
    db = new Pool(config);
}

export const connect = async () => {
    return await db.connect();
};

export { db };
