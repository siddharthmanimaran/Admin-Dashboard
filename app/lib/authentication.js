'use server';

import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { setCookie } from 'cookies-next';
import { cookies } from 'next/headers';

export async function login(formData) {
    const { rows } = await sql`SELECT * FROM admin WHERE email=${formData.email} AND password=${formData.password}`;
    if (rows.length >= 1) {
        setCookie('dashboardLogIn', true, { cookies });
        revalidatePath('/dashboard')
        redirect(`/dashboard`)
    } else {
        revalidatePath('/')
        redirect(`/`)
    }
}
