import { useState } from 'react';
import { NavLink } from 'react-router'
import { IoMenu, IoClose } from "react-icons/io5";

const Header = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const links = [
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: 'Code Stack', href: '/code-stack' },
    ]

    return (
        <header className="w-full fixed top-0 font-oswald bg-first z-999">
            <div className="container-fluid">
                <div className="navbar h-20 flex items-center justify-between gap-2 p-0">
                    <a href="/" className="navbar-brand flex items-center gap-2">
                        <div className="navbar-logo w-12"><img className="w-full h-full object-contain" src="/logo.png" alt="logo" /></div>
                        <span className="text-2xl md:text-4xl font-semibold leading-none text-white">Spectrum <br className="md:hidden" /> Stack</span>
                    </a>
                    <ul className={`nav-menu flex flex-col gap-5 px-5 w-[calc(100%+40px)] -ml-5 md:flex md:flex-row md:static absolute top-full left-0 md:w-auto bg-first md:bg-transparent transition-all duration-300 ease-in ${menuOpen ? 'block py-5 md:py-0' : 'hidden md:block'}`}>
                        {links.map(link =>
                            <li key={link.href} className="nav-item">
                                <NavLink
                                    className={({ isActive }) => `nav-link font-varelaRound text-[22px] font-extrabold  hover:text-[yellowgreen] ${isActive ? 'text-[yellowgreen]' : 'text-second'}`}
                                    to={link.href}
                                >
                                    {link.label}
                                </NavLink>
                            </li>
                        )}
                    </ul>

                    <button className="navbar-toggler text-5xl md:hidden" type="button" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <IoClose /> : <IoMenu />}
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header