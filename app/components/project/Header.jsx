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
        <header className="w-full fixed top-0 font-raleway bg-first z-999">
            <div className="container-fluid">
                <div className="navbar h-15 flex items-center justify-between gap-2 p-0">
                    <a href="/" className="navbar-brand flex items-center gap-2">
                        <div className="navbar-logo w-10"><img className="w-full h-full object-contain" src="/logo.png" alt="logo" /></div>
                        <span className="text-xl font-bold leading-none text-white">Spectrum<br />Stack</span>
                    </a>
               <span className="text-xl font-bold leading-none text-second">Header</span>
               
                </div>
            </div>
        </header>
    )
}

export default Header