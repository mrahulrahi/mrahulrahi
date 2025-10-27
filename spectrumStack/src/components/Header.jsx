import { NavLink } from 'react-router'

const Header = () => {

    const links = [
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: 'Code Stack', href: '/code-stack' }
    ]

    return (
        <header className="w-full fixed font-oswald bg-first z-[99]">
            <div className="container w-full mx-auto">
                <div className="navbar h-[80px] flex items-center justify-between gap-2">
                    <a href="/" className="navbar-brand flex items-center gap-2">
                        <div className="navbar-logo w-14"><img className="w-full h-full object-contain" src="/react.svg" alt="logo" /></div>
                        <span className="text-4xl font-semibold leading-1 text-white">Reactify</span>
                    </a>
                    <ul className="nav-menu flex gap-4">
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
                    <div className="flex gap-4">
                        <span className="h-10"><img className="w-auto h-full object-contain" src="/vite.svg" alt="" /></span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header