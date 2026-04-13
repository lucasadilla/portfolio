import { useEffect, useMemo, useRef } from 'react';
import { shouldInitImageTilt } from '../lib/device';

/**
 * `images[].src` must already be the final URL (including ?v=…) from getServerSideProps.
 */
export default function ProjectImageStack({ images }) {
    const sectionRef = useRef(null);
    const imagesContentKey = useMemo(
        () => images.map((x) => `${x.src}\0${x.text ?? ''}\0${x.alt ?? ''}`).join('\n'),
        [images]
    );

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const root = sectionRef.current;
        if (!root) return;
        const slides = root.querySelectorAll('.project-slide');
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) {
            slides.forEach((el) => el.classList.add('project-slide--visible'));
            return undefined;
        }
        const io = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('project-slide--visible');
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
        );
        slides.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [imagesContentKey]);

    useEffect(() => {
        if (!shouldInitImageTilt()) return;
        if (typeof window === 'undefined') return;
        const VanillaTilt = require('vanilla-tilt');
        VanillaTilt.init(document.querySelectorAll('.project-stack .tilt'), {
            max: 10,
            speed: 750,
            glare: false,
            'max-glare': 0.3,
            scale: 1.1,
            perspective: 1000,
            gyroscope: true,
        });
    }, [imagesContentKey]);

    return (
        <section ref={sectionRef} className="project-stack-section" aria-label="Project gallery">
            <div className="project-stack">
                {images.map((item, i) => {
                    const imageLeft = i % 2 === 0;
                    return (
                        <article
                            key={`${item.src}-${i}`}
                            className={`project-slide ${imageLeft ? 'project-slide--image-left' : 'project-slide--image-right'}`}
                            style={{ '--slide-i': i }}
                        >
                            <div className="project-slide-visual">
                                <div
                                    className={`project-tilt-shell ${imageLeft ? 'project-tilt-shell--leans-right' : 'project-tilt-shell--leans-left'}`}
                                >
                                    <div className="tilt">
                                        <img
                                            src={item.src}
                                            alt={item.alt || `Project still ${i + 1}`}
                                            className="project-stack-image"
                                        />
                                    </div>
                                </div>
                            </div>
                            <p className="project-slide-caption">{item.text}</p>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
