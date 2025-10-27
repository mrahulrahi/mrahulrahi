// src/layouts/CodeStackLayout.jsx
import { Outlet, useLocation } from "react-router";
import { Link } from 'react-router';
import Hero from "../components/Hero";

const CodeStackLayout = () => {
const location = useLocation();
const active = location.pathname;

  const links = [
    { title: 'Js Stack', href: '/code-stack/js-stack' },
    { title: 'Php Stack', href: '/code-stack/php-stack' },
  ];

  return (
    <>
      <Hero bgImg="https://picsum.photos/1920/1000?random=5" title="Start Coding" subTitle="Code Stack" />

      <div className="flex">
        <div className="sticky top-20 h-screen w-80 shrink-0">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
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
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className=" flex flex-col items-center justify-center">
            {/* Page content here */}
            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
              Open drawer
            </label>
          </div>
          <div className="container mb-10 mx-auto px-5">
         
              <Outlet />
       
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeStackLayout;
