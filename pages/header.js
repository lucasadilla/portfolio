import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPortfolioSiteUrl, isLocalOrLoopbackSite } from '../lib/siteConfig';

function siteLinkLabel(url) {
    try {
        const host = new URL(url).hostname.replace(/^www\./, '');
        return host || 'Site';
    } catch {
        return 'Site';
    }
}

function HeaderSiteLink() {
    const siteUrl = getPortfolioSiteUrl();
    if (!siteUrl || isLocalOrLoopbackSite(siteUrl)) return null;
    return (
        <div className="header-site-row">
            <a href={siteUrl} className="header-site-link" target="_blank" rel="noopener noreferrer">
                {siteLinkLabel(siteUrl)}
            </a>
        </div>
    );
}

export default function Header({ breadcrumbs }) {
    const [displayedText, setDisplayedText] = useState('');
    const fullText = 'Lucas Pentland-Hyde';

    useEffect(() => {
        if (breadcrumbs?.length) {
            return undefined;
        }
        let index = 0;
        const typewriterEffect = setInterval(() => {
            setDisplayedText(fullText.slice(0, index + 1));
            index++;
            if (index > fullText.length) {
                clearInterval(typewriterEffect);
            }
        }, 150);

        return () => clearInterval(typewriterEffect);
    }, [breadcrumbs?.length]);

    if (breadcrumbs?.length) {
        return (
            <header className="site-header site-header--breadcrumbs">
                <HeaderSiteLink />
                <nav className="breadcrumb-nav" aria-label="Breadcrumb">
                    <ol className="breadcrumb-list">
                        {breadcrumbs.map((crumb, i) => {
                            const isLast = i === breadcrumbs.length - 1;
                            return (
                                <li key={`${crumb.label}-${i}`} className="breadcrumb-item">
                                    {!isLast && crumb.href ? (
                                        <Link href={crumb.href} legacyBehavior>
                                            <a className="breadcrumb-link">{crumb.label}</a>
                                        </Link>
                                    ) : (
                                        <span className="breadcrumb-current" aria-current="page">
                                            {crumb.label}
                                        </span>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </nav>
            </header>
        );
    }

    return (
        <header className="typewriter-header site-header">
            <HeaderSiteLink />
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
