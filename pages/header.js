import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Header() {
    const [displayedText, setDisplayedText] = useState('');
    const fullText = 'Lucas Pentland-Hyde';

    useEffect(() => {
        let index = 0;
        const typewriterEffect = setInterval(() => {
            setDisplayedText(fullText.slice(0, index + 1));
            index++;
            if (index > fullText.length) {
                clearInterval(typewriterEffect);
            }
        }, 150);

        return () => clearInterval(typewriterEffect);
    }, []);

    return (
        <header className="typewriter-header">
            <div className="typewriter-box">
                <Link href="/" legacyBehavior>
                    <a id="typewriter-link">
                        <span id="typewriter">{displayedText}</span>
                        <span className="typewriter-cursor">|</span>
                    </a>
                </Link>
            </div>
        </header>
    );
}
