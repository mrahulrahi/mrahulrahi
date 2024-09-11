'use client';
import './Header.css';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Button from '../Button';
import { FaLinkedinIn, FaGithub, FaYoutube, FaTelegram } from 'react-icons/fa';

const Header = () => {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false); // State to manage the navbar open/close
    const navbarRef = useRef(null);

    const handleScroll = () => {
        const scrollY = window.scrollY;
        const scrollThreshold = 10;
        if (scrollY > scrollThreshold) {
            document.body.classList.add('fixed');
        } else {
            document.body.classList.remove('fixed');
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            // Clean up the class when component unmounts
            document.body.classList.remove('fixed');
        };
    }, []);

    const currentPath = usePathname();
    const links = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/portfolio', label: 'Portfolio' },
        { path: '#contact', label: 'Contact' },
    ];

    const handleLinkClick = () => {
        // Close the navbar when a link is clicked
        setIsNavbarOpen(false);
    };

    const toggleNavbar = () => {
        // Toggle the navbar open/close state
        setIsNavbarOpen(!isNavbarOpen);
        // Add or remove classes on body based on the navbar state
        if (isNavbarOpen) {
            document.body.classList.remove('open-menu', 'overflow-hidden');
        } else {
            document.body.classList.add('open-menu', 'overflow-hidden');
        }
    };

    return (
        <header id="header">
            <nav className="navbar navbar-expand-xl">
                <div className="container">
                    <div className="nav-inside d-flex align-items-center justify-content-between">
                        <Link className="navbar-logo" href="/" data-aos="fade-zoom-in" data-aos-easing="ease-in-back">
                            <img src="/logo.svg" alt="Logo" />
                        </Link>
                        <button
                            id="navbarToggle"
                            className={`navbar-toggler ${isNavbarOpen ? '' : 'collapsed'}`}
                            type="button"
                            aria-controls="collapsable-nav"
                            aria-expanded={isNavbarOpen}
                            aria-label="Toggle navigation"
                            data-aos="fade-zoom-in"
                            data-aos-easing="ease-in-back"
                            onClick={toggleNavbar}
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className={`collapse navbar-collapse justify-content-center ${isNavbarOpen ? 'show' : ''}`}
                            id="collapsable-nav"
                            ref={navbarRef}
                        >
                            <div className="navbar-inside">
                                <ul className="navbar-nav" data-aos="fade-zoom-in" data-aos-easing="ease-in-back">
                                    {links.map(link => (
                                        <li key={link.path} className={`${link.path === currentPath ? 'active' : ''} nav-item`}>
                                            <Link className="nav-link" href={link.path} onClick={handleLinkClick}>
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                    <div className="nav-item header-btn mx-auto d-xl-none">
                                        <Button title="Hire Me" style='green' />
                                    </div>
                                </ul>
                                <div className="navbar-bottom mt-auto d-xl-none">
                                    <div className="social-links d-flex align-items-center justify-content-center">
                                        <Link className="d-flex align-items-center justify-content-center" href="https://linkedin.com/in/mrahulrahi/">
                                            <FaLinkedinIn />
                                        </Link>
                                        <Link className="d-flex align-items-center justify-content-center" href="https://github.com/mrahulrahi/">
                                            <FaGithub />
                                        </Link>
                                        <Link className="d-flex align-items-center justify-content-center" href="https://www.youtube.com/@fireliquidator">
                                            <FaYoutube />
                                        </Link>
                                        <Link className="d-flex align-items-center justify-content-center" href="https://t.me/mrahulrahi">
                                            <FaTelegram />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="header-btn d-none d-xl-block" data-aos="fade-zoom-in" data-aos-easing="ease-in-back">
                            <Button title="Hire Me" style='green' />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
