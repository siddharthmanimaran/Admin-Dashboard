"use client"

import { getCookie } from 'cookies-next';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation';

function ClientCookieHandler() {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const isLogIn = getCookie('dashboardLogIn');
        const validPath = ['/', 'xxx'];
        if (isLogIn && !validPath.includes(pathname)) {
            router.push('/dashboard');
        } else {
            router.push('/login');
        }
    }, [pathname, router]);
    return null;
}

export default ClientCookieHandler;