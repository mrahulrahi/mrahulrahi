'use client'
import './Header.css'
import Link from 'next/link';
import { usePathname } from 'next/navigation'


const Header = () => {
    const currentPath = usePathname();
    const links = [
        { 'path': '/', 'label': 'Home' },
        { 'path': '/about', 'label': 'About' },
        { 'path': '/portfolio', 'label': 'Portfolio' },
        { 'path': '/aerocPage', 'label': 'AeroC Elements' },
        { 'path': '#contact', 'label': 'Contact' },
    ]

    return (
        <header id="header">
            <nav className="navbar navbar-expand-xl">
                <div className="container">
                    <div className="nav-inside d-flex align-items-center justify-content-between">
                        <Link className="navbar-brand nav-logo" href="/">mrahul<span>rahi</span></Link>
                        <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-center" id="mainNav">
                            <div className="navbar-inside">
                                <ul className="navbar-nav">
                                    {links.map(link =>
                                        <li key={link.path} className={`${link.path === currentPath ? 'active' : ''} nav-item`}><Link className="nav-link" href={link.path}>{link.label}</Link></li>
                                    )}

                                    <div className="nav-item header-btn d-xl-none">
                                        <a href="#!" className="btn btn-default green">Hire Me</a>
                                    </div>
                                </ul>
                                <div className="navbar-bottom mt-auto d-xl-none">
                                    <div className="social-links d-flex align-items-center justify-content-center">
                                        <a className="d-flex align-items-center justify-content-center"
                                            href="https://linkedin.com/in/mrahulrahi/"><i
                                                className="fab fa-linkedin-in"></i></a>
                                        <a className="d-flex align-items-center justify-content-center"
                                            href="https://github.com/mrahulrahi/"><i className="fab fa-github"></i></a>
                                        <a className="d-flex align-items-center justify-content-center"
                                            href="https://www.youtube.com/@fireliquidator"><i
                                                className="fab fa-youtube"></i></a>
                                        <a className="d-flex align-items-center justify-content-center"
                                            href="https://t.me/mrahulrahi"><i className="fab fa-telegram-plane"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="header-btn d-none d-xl-block">
                            <a href="#!" className="btn btn-green">Hire Me</a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header