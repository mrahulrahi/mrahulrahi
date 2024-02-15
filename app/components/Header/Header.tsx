'use client'
import './Header.css'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import Button from '../Button/Button';
import { FaLinkedinIn, FaGithub, FaYoutube, FaTelegram } from "react-icons/fa";

import React, { useState, useEffect } from 'react';


const Header = () => {

    const [scrollClass, setScrollClass] = useState('');
    const handleScroll = () => {
        // Get the scroll position
        const scrollY = window.scrollY;

        // Define a threshold value to determine when to add the class
        const scrollThreshold = 10;

        // Update the state based on the scroll position
        if (scrollY > scrollThreshold) {
            setScrollClass('fixed');
        } else {
            setScrollClass('');
        }
    };
    useEffect(() => {


        // Attach the scroll event listener when the component mounts
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array ensures the effect runs only once on mount

    const currentPath = usePathname();
    const links = [
        { 'path': '/', 'label': 'Home' },
        { 'path': '/about', 'label': 'About' },
        { 'path': '/portfolio', 'label': 'Portfolio' },
        { 'path': '#contact', 'label': 'Contact' },
    ]

    return (
        <section className={`${scrollClass}`}>
            <header id="header" >
                <nav className="navbar navbar-expand-xl">
                    <div className="container">
                        <div className="nav-inside d-flex align-items-center justify-content-between">
                            <Link className="navbar-logo" href="/">mrahul<span>rahi</span></Link>
                            <button id="navbarToggle" className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapsable-nav" aria-controls="collapsable-nav" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-center" id="collapsable-nav">
                                <div className="navbar-inside">
                                    <ul className="navbar-nav">
                                        {links.map(link =>
                                            <li key={link.path} className={`${link.path === currentPath ? 'active' : ''} nav-item`}><Link className="nav-link" href={link.path}>{link.label}</Link></li>
                                        )}

                                        <div className="nav-item header-btn mx-auto d-xl-none">
                                        <Button title="Hire Me" style='green' />
                                        </div>
                                    </ul>
                                    <div className="navbar-bottom mt-auto d-xl-none">
                                        <div className="social-links d-flex align-items-center justify-content-center">
                                            <Link className="d-flex align-items-center justify-content-center"
                                                href="https://linkedin.com/in/mrahulrahi/"><FaLinkedinIn /></Link>
                                            <Link className="d-flex align-items-center justify-content-center"
                                                href="https://github.com/mrahulrahi/"><FaGithub /></Link>
                                            <Link className="d-flex align-items-center justify-content-center"
                                                href="https://www.youtube.com/@fireliquidator"><FaYoutube /></Link>
                                            <Link className="d-flex align-items-center justify-content-center"
                                                href="https://t.me/mrahulrahi"><FaTelegram /></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="header-btn d-none d-xl-block">
                                <Button title="Hire Me" style='green' />
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </section>

    )
}

export default Header