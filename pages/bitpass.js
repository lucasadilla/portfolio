import Header from './header';
import { useState, useEffect } from 'react';

export default function BitPass() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        { src: "/images/BITPASS.png", text: "A password generation and analysis tool made in 24 hours for ConUHacks 2022." },
        { src: "/images/bitpass3.png", text: "Evaluate the strength and security of passwords against brute force attacks." },
        { src: "/images/bitpass2.png", text: "Generate complex passwords with varying lengths and character sets." },
        { src: "/images/bitpass4.png", text: "Explore factors that contribute to password strength and security." },
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
            <Header/>
            <section className="carousel">
                <div className="carousel-container">
                    <button className="arrow left-arrow" onClick={prevImage}>
                        <i></i><i></i>
                    </button>
                    <div className="image-text-container">
                        <div className="tilt">
                            <img
                                src={images[currentIndex].src}
                                alt={`Slide ${currentIndex + 1}`}
                                className="carousel-image"
                            />
                        </div>
                        <p className="image-description">{images[currentIndex].text}</p>
                    </div>
                    <button className="arrow right-arrow" onClick={nextImage}>
                        <i></i><i></i>
                    </button>
                </div>
            </section>
            <section>
                <h2>Technologies Utilized</h2>
                <h3>Electron · React · JavaScript · Tailwind CSS · HTML</h3>
                <a href="https://github.com/lucasadilla/BITPASS" className="home-button">GitHub Repository</a>
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
