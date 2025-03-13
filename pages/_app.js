import '../styles/globals.css';
import { useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react";
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        // Cursor setup
        const cursor = document.createElement('div');
        cursor.classList.add('cursor');
        document.body.appendChild(cursor);

        const moveCursor = (e) => {
            cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        };

        document.addEventListener('mousemove', moveCursor);


        const selectionStyles = [
            { backgroundColor: "#fff100", color: "#000" },
            { backgroundColor: "#07ff2d", color: "#000000" },
            { backgroundColor: "#ff84ff", color: "#000000" },
            // Add more styles if you like
        ];

        // We'll store the current style so we don't update it repeatedly during one selection.
        let currentStyle = null;

        const updateSelectionStyle = (style) => {
            document.documentElement.style.setProperty('--selection-bg', style.backgroundColor);
            document.documentElement.style.setProperty('--selection-color', style.color);
        };

        const selectionChangeHandler = () => {
            const selection = window.getSelection();
            // When there's an active (non-collapsed) selection
            if (selection && !selection.isCollapsed) {
                // Only update if we haven't already set a style for this selection
                if (!currentStyle) {
                    currentStyle = selectionStyles[Math.floor(Math.random() * selectionStyles.length)];
                    updateSelectionStyle(currentStyle);
                }
            } else {
                // Reset when the selection is cleared
                currentStyle = null;
            }
        };

        document.addEventListener('selectionchange', selectionChangeHandler);

        // Combined cleanup function for all event listeners
        return () => {
            document.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('selectionchange', selectionChangeHandler);
            if (cursor.parentNode) {
                cursor.parentNode.removeChild(cursor);
            }
        };
    }, []);

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <title>Lucas Pentland-Hyde</title>
            </Head>
            <Component {...pageProps} />
            <Analytics />
        </>
    );
}

export default MyApp;
