import Header from './header';
import { useEffect } from 'react';

export default function BitPass() {
    useEffect(() => {
        // Initialize VanillaTilt
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
            <section>
                <h2>BITPASS</h2>
                <div className="subheader">
                    <h4>Password generation and analysis tool</h4>
                </div>
            </section>
            <section className="content-section">
                <div className="item-container">
                    <div className="tilt">
                        <img src="/images/BITPASS.png" alt="debate" className="feature-image" />
                    </div>
                    <div className="text-box">
                        <h4>This project was made in 24 hours for ConUHacks 2022</h4>
                    </div>
                </div>
                <div className="item-container">
                    <div className="tilt">
                        <img src="/images/bitpass3.png" alt="instigate" className="feature-image" />
                    </div>
                    <div className="text-box">
                        <h4>Evaluate the strength and security of passwords against brute force attacks.</h4>
                    </div>
                </div>
                <div className="item-container">
                    <div className="tilt">
                        <img src="/images/bitpass2.png" alt="deliberate" className="feature-image" />
                    </div>
                    <div className="text-box">
                        <h4>Generate passwords with different levels of complexity, including varying lengths and
                            character sets.</h4>
                    </div>
                </div>
                <div className="item-container">
                    <div className="tilt">
                        <img src="/images/bitpass4.png" alt="deliberate" className="feature-image" />
                    </div>
                    <div className="text-box">
                        <h4>Explore the factors that contribute to password strength and security as you utilize our
                            tool.</h4>
                    </div>
                </div>
            </section>
            <section>
                <h2>Technologies Utilized</h2>
                <h3>Electron · React · JavaScript · Tailwind CSS · HTML</h3>
                <a href="https://github.com/lucasadilla/BITPASS" className="home-button">GitHub Repository</a>
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