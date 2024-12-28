import Header from './header';
import { useState, useEffect } from 'react';

export default function Udem() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        "/images/Screenshot 2024-12-23 005652.png",
        "/images/Screenshot 2024-12-23 010342.png",
        "/images/Screenshot 2024-12-23 010513.png",
        "/images/Screenshot 2024-12-23 010707.png"
    ];

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const VanillaTilt = require('vanilla-tilt');
            VanillaTilt.init(document.querySelectorAll('.tilt'), {
                max: 10,
                speed: 750,
                glare: false,
                "max-glare": 0.3,
                scale: 1.1,
                perspective: 1000,
                gyroscope: true,
            });
        }
    }, []);

    return (
        <div>
            <Header />
            <section className="carousel">
                <div className="carousel-container">
                    <button className="arrow left-arrow" onClick={prevImage}>
                        <i></i><i></i>
                    </button>
                    <div className="tilt">
                        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="carousel-image" />
                    </div>
                    <button className="arrow right-arrow" onClick={nextImage}>
                        <i></i><i></i>
                    </button>
                </div>
            </section>
            <section>
                <a href="https://www.femmesetdroitudem.com/" className="thing">Check out the site</a>
                <h2>Technologies Utilized</h2>
                <h3>JavaScript · CSS · HTML · Next.js · Node.js · Vercel</h3>
                <a href="https://github.com/lucasadilla/UDEMDROIT" className="home-button">GitHub Repository</a>
            </section>
            <footer>
                <div className="footer-content">
                <a href="https://www.linkedin.com/in/lucas-pentland-hyde-aa7130240/" className="footer-link"
                       target="_blank">
                        <img src="/images/linkedin-black-logo-icon.png" alt="LinkedIn" className="footer-icon"/>
                    </a>
                    <a href="https://github.com/lucasadilla" className="footer-link" target="_blank">
                        <img src="/images/github.png" alt="GitHub" className="footer-icon"/>
                    </a>
                    <a href="mailto:lucas.pentlandhyde@gmail.com" className="footer-link">
                        <img src="/images/envelope.png" alt="Email" className="footer-icon"/>
                    </a>
                </div>
            </footer>
        </div>
    );
}
