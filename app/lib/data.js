import { sql } from "@vercel/postgres";
import { NextResponse } from 'next/server';
// export const login = async () => {
//   try {

//     const res = await sql`SELECT * FROM admin`
//   } catch (error) {
//   }
// }

export async function GET(request) {
  try {
    const { rows } = await sql`SELECT * FROM admin`;
    return NextResponse.json({ rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export const fetchCardData = async () => {
  try {
    const actors = await sql`SELECT COUNT(*) FROM actor`;
    const flims = await sql`SELECT COUNT(*) FROM film`;
    const customers = await sql`SELECT COUNT(*) FROM customer`;
    const payment = await sql`SELECT SUM(amount) FROM payment`;

    const data = await Promise.all([actors, flims, customers, payment]);
    const numberOfActors = data[0].rows[0].count ?? '0'
    const numberOfFilms = data[1].rows[0].count ?? '0'
    const numberOfCustomers = data[2].rows[0].count ?? '0'
    const totalPayment = data[3].rows[0].sum ?? '0'
    return {
      numberOfActors,
      numberOfFilms,
      numberOfCustomers,
      totalPayment,
    }
  } catch (error) {
    // throw error
  }
}