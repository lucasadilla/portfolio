import Header from './header';
import { useEffect } from 'react';

export default function Personal() {
    return (
        <div>
            <Header>
                <a href="/" className="home-button">Lucas Pentland-Hyde</a>
            </Header>
            <section>
                <h2>Personal Website</h2>
                <div className="subheader">
                    <h4>To showcase my work</h4>
                </div>
            </section>
            <section>
                <h4>Tried new front-end development methods, such as:</h4>
                <h4>Creating animation using CSS and JavaScript.</h4>
            </section>
            <section>
                <h2>Technologies Utilized</h2>
                <h3>JavaScript · CSS · HTML · Next.js · Node.js · Vercel</h3>
                <a href="https://github.com/lucasadilla/Personal-website" className="home-button">GitHub Repository</a>
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
