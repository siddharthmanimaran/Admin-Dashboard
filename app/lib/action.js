'use server';

import { sql } from '@vercel/postgres';

export const login = async (state, formData) => {
    console.log("🚀 ~ login ~ state:", state)
    const data = await sql`SELECT * FROM admin`
    console.log("🚀 ~ login ~ data:", data)
}
