import Header from './header';
import { useEffect } from 'react';

export default function Debate() {
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
                <h2>BICKER</h2>
                <div className="subheader">
                    <h4>The game of instigating, debating, and deliberating!</h4>
                </div>
            </section>
            <section>
                <div className="tilt">
                    <img src="/images/Capture4.JPG" alt="debate" className="feature-image" />
                </div>
                <h4>Start off by writing down a controversial opinion of yours in under 200 characters.</h4>
                <div className="tilt">
                    <img src="/images/Capture3.JPG" alt="instigate" className="feature-image" />
                </div>
                <h4>Find an opinion you disagree with and respond in under 200 characters.</h4>
                <div className="tilt">
                    <img src="/images/Capture2.JPG" alt="deliberate" className="feature-image" />
                </div>
                <h4>Vote on other's disagreements.</h4>
            </section>
            <section>
                <h2>Technologies Utilized</h2>
                <h3>JavaScript · CSS · HTML · Next.js · Node.js</h3>
                <a href="https://github.com/lucasadilla/BICKER" className="home-button">GitHub Repository</a>
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