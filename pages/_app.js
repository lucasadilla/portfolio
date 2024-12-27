import '../styles/globals.css';
import { useEffect } from 'react';

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

    return <Component {...pageProps} />;
}

export default MyApp;
