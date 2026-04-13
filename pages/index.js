import Link from 'next/link';
import Header from './header';

export default function Home() {
    return (
        <div className="page-container">
            <main className="main-content">
                <Header />
                <h3 className="subtitle">Computer Science Student · Based in Montreal</h3>
                <Link href="/projects" className="projects-hub-box">
                    Projects
                </Link>
            </main>
            <footer>
                <div className="footer-content">
                    <a href="https://www.linkedin.com/in/lucas-pentland-hyde/" className="footer-link"
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
