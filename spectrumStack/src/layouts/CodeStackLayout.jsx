// src/layouts/CodeStackLayout.jsx
import { useState } from 'react';
import { Outlet, useLocation } from "react-router";
import { Link } from 'react-router';
import Hero from "../components/Hero";

const CodeStackLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();
  const active = location.pathname;

  const links = [
    { title: 'Js Stack', href: '/code-stack/js-stack' },
    { title: 'Php Stack', href: '/code-stack/php-stack' },
    { title: 'Tools', href: '/code-stack/tools' },
  ];

  return (
    <>
      <Hero bgImg="https://picsum.photos/1920/1000?random=5" title="Start Coding" subTitle="Code Stack" />

      <div className="flex items-start overflow-x-clip">
        <div className={`fixed left-0 z-99 lg:sticky top-20 lg:left-auto h-screen w-80 shrink-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} transition-transform duration-300 ease-in-out`}>
          <button type="button" className=" absolute left-full top-0 btn btn-primary lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)} >Toogle drawer</button>
          <ul className="d-flex flex-col h-full bg-base-200 text-base-content w-full min-h-full p-4 overflow-auto">
            {/* Sidebar content here */}
            {links.map((card, index) => (
              <li className="not-last:mb-2" key={index}>
                <Link className={`w-full py-2 px-4 rounded-xl border hover:bg-green-600 hover:border-green-600 hover:text-white transition ${active === card.href ? 'bg-green-600 border-green-600' : 'bg-white/10 border-[#ccc]'}`} to={card.href} >
                  {card.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="grow">
          <div className="flex flex-col items-center justify-center">

            {/* Page content here */}
          </div>

          <div className="w-full mb-10">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeStackLayout;
