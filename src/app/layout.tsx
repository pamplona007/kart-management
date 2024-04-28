'use client';

import { PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import styles from './layout.module.scss';

import './bootstrap.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './globals.css';

const queryClient = new QueryClient();

const RootLayout = ({ children }: PropsWithChildren) => {
    return (
        <html lang={'en'}>
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
};

export default RootLayout;
