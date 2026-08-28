import { Pool } from "pg"
import "dotenv/config"

const connectionString = process.env.NEON_CONNECTION

if (!connectionString){
    throw new Error("NEON_CONNECTION is not defined")
}

export const db = new Pool({
    connectionString
})
