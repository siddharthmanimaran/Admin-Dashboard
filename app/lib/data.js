import { sql } from "@vercel/postgres";
import { NextResponse } from 'next/server';
// export const login = async () => {
//   try {

//     console.log("🚀 ~ login ~ data:", process.env.POSTGRES_URL)


//     const res = await sql`SELECT * FROM admin`

//     console.log("🚀 ~ login ~ res:", res)
//   } catch (error) {
//     console.log("🚀 ~ login ~ error:", error)

//   }
// }

export async function GET(request) {
  try {
    const { rows } = await sql`SELECT * FROM admin`;
    console.log("🚀 ~ GET ~ rows:", rows)
    return NextResponse.json({ rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}