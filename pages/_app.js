import '../styles/globals.css';
import { useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react";
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        const cursor = document.createElement('div');
        cursor.classList.add('cursor');
        document.body.appendChild(cursor);

        const moveCursor = (e) => {
            cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        };

        document.addEventListener('mousemove', moveCursor);

        return () => {
            document.removeEventListener('mousemove', moveCursor);
        };
    }, []);

    return (
        <>
            {/* Global Favicon Setup */}
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <title>Lucas Pentland-Hyde</title> {/* Optional global title */}
            </Head>

            <Component {...pageProps} />
            <Analytics />
        </>
    );
}

export default MyApp;
