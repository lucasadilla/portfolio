import Header from './header';
import { useState, useEffect } from 'react';

export default function Debate() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        { src: "/images/bicker3.png", text: "Write down a controversial opinion in under 200 characters." },
        { src: "/images/bicker2.png", text: "Respond to an opinion you disagree with in under 200 characters." },
        { src: "/images/bicker4.png", text: "Vote on others' disagreements and decide the winner." },
        { src: "/images/bicker5.png", text: "View other debates and their vote counts." },
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
                <h3>JavaScript · CSS · HTML · Next.js · Node.js</h3>
                <a href="https://github.com/lucasadilla/BICKER" className="home-button">GitHub Repository</a>
            </section>
            <footer>
                <div className="footer-content">
                    <a href="https://www.linkedin.com/in/lucas-pentland-hyde-aa7130240/" className="footer-link" target="_blank">
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
