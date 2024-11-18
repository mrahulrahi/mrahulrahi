'use client';
import './Header.css';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Button from '../Button';
import { FaLinkedinIn, FaGithub, FaYoutube, FaTelegram } from 'react-icons/fa';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
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
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('open-menu', 'overflow-hidden');
        } else {
            document.body.classList.remove('open-menu', 'overflow-hidden');
        }
    }, [isOpen]);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = () => {
        if (isOpen) {
            setIsOpen(false);
        }
    };

    const currentPath = usePathname();
    const links = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/portfolio', label: 'Portfolio' },
        { path: '#contact', label: 'Contact' },
    ];

    const socialLinks = [
        { path: 'https://linkedin.com/in/mrahulrahi/', icon: <FaLinkedinIn /> },
        { path: 'https://github.com/mrahulrahi/', icon: <FaGithub /> },
        { path: 'https://www.youtube.com/@fireliquidator', icon: <FaYoutube /> },
        { path: 'https://t.me/mrahulrahi', icon: <FaTelegram /> },
    ];

    return (
        <header id="header">
            <nav className="navbar navbar-expand-xl">
                <div className="container">
                    <div className="nav-inside d-flex align-items-center justify-content-between">
                        <Link className="navbar-logo" href="/" data-aos="fade-zoom-in" data-aos-easing="ease-in-back" suppressHydrationWarning>
                            <img src="/logo.svg" alt="Logo" />
                        </Link>
                        <button
                            id="navbarToggle"
                            className={`navbar-toggler ${isOpen ? '' : 'collapsed'}`}
                            type="button"
                            aria-controls="collapsable-nav"
                            aria-expanded={isOpen}
                            aria-label="Toggle navigation"
                            data-aos="fade-zoom-in"
                            data-aos-easing="ease-in-back"
                            onClick={toggleNavbar}
                            suppressHydrationWarning
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className={`collapse navbar-collapse justify-content-center ${isOpen ? 'show' : ''}`}
                            id="collapsable-nav"
                            ref={navbarRef}
                        >
                            <div className="navbar-inside">
                                <ul className="navbar-nav" data-aos="fade-zoom-in" data-aos-easing="ease-in-back" suppressHydrationWarning>
                                    {links.map(link => (
                                        <li key={link.path} className={`${link.path === currentPath ? 'active' : ''} nav-item`}>
                                            <Link className="nav-link" href={link.path} onClick={handleLinkClick}>
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                    <div className="nav-item header-btn mx-auto d-xl-none">
                                        <Button title="Hire Me" style='gradient' />
                                    </div>
                                </ul>
                                <div className="navbar-bottom mt-auto d-xl-none">
                                    <div className="social-links d-flex align-items-center justify-content-center">
                                        {socialLinks.map(link => (
                                            <Link key={link.path} className="d-flex align-items-center justify-content-center" href={link.path}>
                                                {link.icon}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="header-btn d-none d-xl-block" data-aos="fade-zoom-in" data-aos-easing="ease-in-back" suppressHydrationWarning>
                            <Button title="Hire Me" style='gradient' />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
