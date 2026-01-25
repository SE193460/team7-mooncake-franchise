import { Pool } from "pg";

export const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "admin",
    password: "123456",
    database: "central_kitchen",
});
