import Header from './header';
import { useEffect } from 'react';

export default function Personal() {
    return (
        <div>
            <Header>
                <a href="/" className="home-button">Lucas Pentland-Hyde</a>
            </Header>
            <section>
                <h4>Tried to keep this site as simple as possible while adding some new css features, such as:</h4>
                <h3>A circular cursor that inverses anything it is hovering over.</h3>
                <h3>A typewriter effect.</h3>
                <h3>Arrows that fold when hovered over.</h3>

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
