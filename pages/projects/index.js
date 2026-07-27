import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Header from '../header';
import { projectsHubBreadcrumbs } from '../../lib/breadcrumbs';
import { getProjectsGroupedByYear } from '../../lib/projectsContent';

const FLIP_MS = 480;
const FLIP_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';

function ListFilterIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M3 6h18" />
            <path d="M7 12h10" />
            <path d="M10 18h4" />
        </svg>
    );
}

function prefersReducedMotion() {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function readFlipRects(root) {
    const map = new Map();
    if (!root) return map;
    root.querySelectorAll('[data-flip-key]').forEach((el) => {
        const key = el.getAttribute('data-flip-key');
        if (key) map.set(key, el.getBoundingClientRect());
    });
    return map;
}

export default function Projects() {
    const [sort, setSort] = useState('newest');
    const [filterOpen, setFilterOpen] = useState(false);
    const filterRef = useRef(null);
    const groupsRef = useRef(null);
    const prevRectsRef = useRef(null);
    const menuId = useId();
    const yearGroups = getProjectsGroupedByYear(sort);

    useEffect(() => {
        if (!filterOpen) return undefined;

        const onPointerDown = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setFilterOpen(false);
            }
        };
        const onKeyDown = (event) => {
            if (event.key === 'Escape') setFilterOpen(false);
        };

        document.addEventListener('pointerdown', onPointerDown);
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('pointerdown', onPointerDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [filterOpen]);

    useLayoutEffect(() => {
        const prevRects = prevRectsRef.current;
        if (!prevRects) return undefined;
        prevRectsRef.current = null;

        const root = groupsRef.current;
        if (!root || prefersReducedMotion()) return undefined;

        const cleanups = [];
        root.querySelectorAll('[data-flip-key]').forEach((el) => {
            const key = el.getAttribute('data-flip-key');
            const first = key ? prevRects.get(key) : null;
            if (!first) return;

            const last = el.getBoundingClientRect();
            const dx = first.left - last.left;
            const dy = first.top - last.top;
            if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return;

            el.classList.add('is-flipping');
            el.style.transition = 'none';
            el.style.transform = `translate(${dx}px, ${dy}px)`;
            void el.offsetWidth;
            el.style.transition = `transform ${FLIP_MS}ms ${FLIP_EASING}`;
            el.style.transform = 'translate(0, 0)';

            const onEnd = (event) => {
                if (event.target !== el || event.propertyName !== 'transform') return;
                el.classList.remove('is-flipping');
                el.style.transition = '';
                el.style.transform = '';
                el.removeEventListener('transitionend', onEnd);
            };
            el.addEventListener('transitionend', onEnd);
            cleanups.push(() => {
                el.removeEventListener('transitionend', onEnd);
                el.classList.remove('is-flipping');
                el.style.transition = '';
                el.style.transform = '';
            });
        });

        return () => {
            cleanups.forEach((fn) => fn());
        };
    }, [sort, yearGroups]);

    const chooseSort = (nextSort) => {
        if (nextSort === sort) {
            setFilterOpen(false);
            return;
        }
        if (!prefersReducedMotion()) {
            prevRectsRef.current = readFlipRects(groupsRef.current);
        }
        setSort(nextSort);
        setFilterOpen(false);
    };

    return (
        <div className="projects-page">
            <Header breadcrumbs={projectsHubBreadcrumbs()} />
            <main className="projects-page-main">
                <div className="projects-filter" ref={filterRef}>
                    <button
                        type="button"
                        className={`projects-filter-trigger${filterOpen ? ' is-open' : ''}`}
                        aria-label="Filter projects"
                        aria-haspopup="menu"
                        aria-expanded={filterOpen}
                        aria-controls={menuId}
                        onClick={() => setFilterOpen((open) => !open)}
                    >
                        <ListFilterIcon />
                    </button>
                    {filterOpen ? (
                        <div id={menuId} className="projects-filter-menu" role="menu" aria-label="Sort by date">
                            <button
                                type="button"
                                role="menuitemradio"
                                aria-checked={sort === 'newest'}
                                className={`projects-filter-option${sort === 'newest' ? ' is-active' : ''}`}
                                onClick={() => chooseSort('newest')}
                            >
                                Newest
                            </button>
                            <button
                                type="button"
                                role="menuitemradio"
                                aria-checked={sort === 'oldest'}
                                className={`projects-filter-option${sort === 'oldest' ? ' is-active' : ''}`}
                                onClick={() => chooseSort('oldest')}
                            >
                                Oldest
                            </button>
                        </div>
                    ) : null}
                </div>

                <div className="projects-year-groups" ref={groupsRef}>
                    {yearGroups.map(({ year, projects }) => (
                        <section
                            key={year}
                            className="projects-year-section"
                            aria-labelledby={`projects-year-${year}`}
                        >
                            <h2
                                id={`projects-year-${year}`}
                                className="projects-year-heading"
                                data-flip-key={`year-${year}`}
                            >
                                {year}
                            </h2>
                            <ul className="projects-page-list">
                                {projects.map(({ href, label, slug }) => (
                                    <li key={slug} data-flip-key={`project-${slug}`}>
                                        <Link href={href} prefetch={false} legacyBehavior>
                                            <a className="home-button small-button projects-page-link">{label}</a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>
            </main>
            <footer>
                <div className="footer-content">
                    <a href="https://www.linkedin.com/in/lucas-pentland-hyde/" className="footer-link" target="_blank">
                        <img src="/images/linkedin-black-logo-icon.png" alt="LinkedIn" className="footer-icon" />
                    </a>
                    <a href="https://github.com/lucasadilla" className="footer-link" target="_blank">
                        <img src="/images/github.png" alt="GitHub" className="footer-icon" />
                    </a>
                    <a href="mailto:lucas.pentlandhyde@gmail.com" className="footer-link">
                        <img src="/images/envelope.png" alt="Email" className="footer-icon" />
                    </a>
                </div>
            </footer>
        </div>
    );
}
