'use client';

import { PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import styles from './layout.module.scss';
import './globals.css';

const queryClient = new QueryClient();

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en">
            <body>
                <QueryClientProvider client={queryClient}>
                    <main className={styles.main}>
                        <div className={styles.overlay}></div>
                        {children}
                    </main>
                </QueryClientProvider>
            </body>
        </html>
    );
}
