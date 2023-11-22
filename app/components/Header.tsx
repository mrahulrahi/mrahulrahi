'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const Header = () => {
    const currentPath = usePathname();
    const links = [
        { 'path': '/', 'label': 'Home' },
        { 'path': '/about', 'label': 'About' },
        { 'path': '/portfolio', 'label': 'Portfolio' },
        { 'path': '/apps&cards', 'label': 'Apps & Cards' },
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
                            <a href="#!" className="btn btn-default green">Hire Me</a>
                        </div>
                    </div>
                </div>
            </nav>


                <nav className="navbar navbar-expand-xl">
                    <div className="container">
                        <div className="nav-inside d-flex align-items-center justify-content-between">
                            <a className="navbar-brand" href="#!"><img src="include/images/logo.png" alt="logo"/></a>
                            <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav"
                                aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-end" id="mainNav">
                                <div className="navbar-inside">
                                    <ul className="navbar-nav">
                                        <li className="nav-item"><a className="nav-link" href="./index.html">Home</a></li>
                                        <li className="nav-item dropdown"><a className="nav-link" href="./apps.html">Apps</a>
                                            <em className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" role="button"></em>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item" href="./Calculator_UI/index.html">Calculator UI</a></li>
                                                <li><a className="dropdown-item" href="./Gradient_BG/index.html">Gradient BG</a></li>
                                                <li><a className="dropdown-item" href="./Notes_App/index.html">Notes App</a></li>
                                                <li><a className="dropdown-item" href="./Quiz_Game/index.html">Quiz Game</a></li>
                                            </ul>
                                        </li>
                                        <li className="nav-item"><a className="nav-link" href="./cards.html">Cards</a></li>
                                        <li className="nav-item"><a className="nav-link" href="./components.html">Components</a></li>
                                        <li className="nav-item"><a className="nav-link" href="#!">Contact</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="header-btn">
                                <a href="#!" className="btn btn-default">Donate</a>
                            </div>
                        </div>
                    </div>
                </nav>
         
        </header>
    )
}

export default Header