'use client';
import * as motion from "motion/react-client"
import './Header.css';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Button from '../Button';
import { FaLinkedinIn, FaGithub, FaYoutube, FaTelegram } from 'react-icons/fa';
import { LuSun, LuMoon } from "react-icons/lu";

// Custom hook for dark mode
function useDarkMode() {
 const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if user has a saved preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      setIsDark(JSON.parse(saved));
    } else {
      // Otherwise check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
    }
  }, []);

  useEffect(() => {
    // Save preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(isDark));
    
    // Apply dark class to html element
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggle = () => setIsDark(prev => !prev);

  return { isDark, toggle };
}


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isDark, toggle } = useDarkMode();

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
        { path: '/#portfolio', label: 'Portfolio' },
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
                        <motion.a className="navbar-logo" href="/" initial={{ opacity: 0, filter: 'blur(10px)' }}
                            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.2 }}>
                            <img src="/logo.svg" alt="Logo" />
                        </motion.a>
                        <motion.button
                            id="navbarToggle"
                            className={`navbar-toggler ${isOpen ? '' : 'collapsed'}`}
                            type="button"
                            aria-controls="collapsable-nav"
                            aria-expanded={isOpen}
                            aria-label="Toggle navigation"
                            onClick={toggleNavbar}
                            initial={{ opacity: 0, filter: 'blur(10px)' }}
                            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <span className="navbar-toggler-icon"></span>
                        </motion.button>
                        <div
                            className={`collapse navbar-collapse justify-content-center ${isOpen ? 'show' : ''}`}
                            id="collapsable-nav"
                            ref={navbarRef}
                        >
                            <div className="navbar-inside">
                                <motion.ul className="navbar-nav" initial={{ opacity: 0, filter: 'blur(10px)' }}
                                    whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    viewport={{ once: true, amount: 0.2 }}>
                                    {links.map(link => (
                                        <li key={link.path} className={`${link.path === currentPath ? 'active' : ''} nav-item`}>
                                            <Link className="nav-link" href={link.path} onClick={handleLinkClick}>
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </motion.ul>
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
                        <motion.div className="header-btn" initial={{ opacity: 0, filter: 'blur(10px)' }}
                            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.2 }}>
                            <button
                                onClick={toggle}
                                className={`dark-mode-toggler d-flex align-items-center justify-content-center p-2 ${isDark
                                        ? 'active'
                                        : ''
                                    }`}
                                aria-label="Toggle dark mode"
                            >
                                {isDark ? <LuSun size={24} /> : <LuMoon size={24} />}
                            </button>
                        </motion.div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
