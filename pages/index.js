import Link from 'next/link';
import Header from './header';

export default function Home() {
    return (
        <div className="page-container">
            <main className="main-content">
                <Header />
                <h3 className="subtitle">Computer Science Student · Based in Montreal</h3>
                <ul className="link-list">
                    <li>
                        <Link href="/bitpass" legacyBehavior>
                            <a className="home-button small-button">BITPASS</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/personal" legacyBehavior>
                            <a className="home-button small-button">PERSONAL</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/debate" legacyBehavior>
                            <a className="home-button small-button">BICKER</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/raz" legacyBehavior>
                            <a className="home-button small-button">RAZ</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/udem" legacyBehavior>
                            <a className="home-button small-button">UDEM</a>
                        </Link>
                    </li>
                </ul>
            </main>
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
