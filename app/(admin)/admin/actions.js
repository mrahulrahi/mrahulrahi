'use server'

import { cookies } from 'next/headers';

export async function loginAction(username, password) {
    const validUsername = process.env.ADMIN_USERNAME;
    const validPassword = process.env.ADMIN_PASSWORD;

    if (username === validUsername && password === validPassword) {
        const cookieStore = await cookies();
        cookieStore.set('admin_auth_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });
        return { success: true };
    }

    return { success: false, error: 'Invalid username or password' };
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_auth_session');
    return { success: true };
}
