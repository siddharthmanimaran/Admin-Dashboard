import { Inter } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Dashboard',
    description: 'Dashboard with postgres',
}

const ClientCookieHandler = dynamic(() => import('./AuthHandler'), {
    ssr: false,
});

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className} suppressHydrationWarning={true}>
                <ClientCookieHandler />
                {children}
            </body>
        </html>
    )
}
