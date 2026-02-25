'use client'
import { useState } from 'react';
import { usePathname } from "next/navigation";
import Link from 'next/link';
import { useGradient } from '../../context/GradientContext.jsx';
import Hero from "../components/Hero.jsx";
import { TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { FaDiceFour, FaCalculator, FaNoteSticky, FaCloudSun, FaQuoteRight } from 'react-icons/fa6';

const CodeStackLayout = ({ children }) => {
  const { gradientStyle, changeGradientColor } = useGradient();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = usePathname();
  const active = location.pathname;

  // Check if we're on the parent route (exact match)
  const isParentPage = active === '/code-stack' || active === '/code-stack/';

  const links = [
    { title: 'Js Stack', href: '/code-stack/js-stack', icon: <FaNoteSticky /> },
    { title: 'Php Stack', href: '/code-stack/php-stack', icon: <FaNoteSticky /> },
    { title: 'Quiz App', href: '/code-stack/tools/quiz-app', icon: <FaDiceFour /> },
    { title: 'Calculator App', href: '/code-stack/tools/calculator-app', icon: <FaCalculator /> },
    { title: 'Notes App', href: '/code-stack/tools/notes-app', icon: <FaNoteSticky /> },
    { title: 'Weather App', href: '/code-stack/tools/weather-app', icon: <FaCloudSun /> },
    { title: 'Quote App', href: '/code-stack/tools/quote-app', icon: <FaQuoteRight /> },
    { title: 'Salary Calculator', href: '/code-stack/tools/salary-calculator', icon: <FaCalculator /> },
    { title: 'Smart EMI Planner', href: '/code-stack/tools/smart-emi-planner', icon: <FaCalculator /> },
    { title: 'Salary Calculator', href: '/code-stack/tools/salary-calculator-two', icon: <FaCalculator /> },
  ];

  // Hero configuration based on current route
  const getHeroConfig = () => {
    if (isParentPage) {
      return {
        bgImg: "https://picsum.photos/1920/1000?random=5",
        title: "Start Coding",
        subTitle: "Code Stack",
      };
    }

    // Child page heroes - customize based on the route
    const childHeroConfigs = {
      '/code-stack/js-stack': {
        title: "Modern JS Development",
        subTitle: "JS Stack",
        gradientColor: gradientStyle
      },
      '/code-stack/php-stack': {
        title: "Server-side Development",
        subTitle: "Php Stack",
        gradientColor: gradientStyle
      },
    };

    return childHeroConfigs[active] || {
      title: links.find(link => link.href === active)?.title || "Code Stack",
      subTitle: "Essential Tools & Resources",
      gradientColor: gradientStyle
    };
  };

  const heroConfig = getHeroConfig();


  return (
    <>
      <Hero bgImg={heroConfig.bgImg} title={heroConfig.title} subTitle={heroConfig.subTitle} gradientColor={heroConfig.gradientColor} />

      <div className="flex items-start overflow-x-clip">
        <div className={`fixed p-2 pr-0 left-0 z-99 lg:z-9 lg:sticky top-15 lg:left-auto h-auto max-h-[calc(100vh-60px)] w-80 shrink-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} transition-transform duration-300 ease-in-out`}>
          <div className=" absolute top-2 left-2 bottom-2 right-0 rounded-2xl opacity-50" style={gradientStyle}></div>
          <button type="button" className="text-2xl px-3 py-3 rounded-none rounded-r-md absolute left-full top-10 btn btn-lg btn-primary lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)} >{sidebarOpen ? <TbLayoutSidebarLeftExpandFilled /> : <TbLayoutSidebarLeftCollapseFilled />}</button>
          <ul className="relative d-flex flex-col w-full h-full text-base-content min-h-full overflow-auto bg-white/20 p-2.5 rounded-2xl">

            {/* Sidebar content here */}
            {links.map((card, index) => (
              <li className="not-last:mb-2" key={index}>
                <Link className={`w-full h-10 flex items-center justify-start gap-3 py-2 px-4 rounded-xl border-2 hover:bg-primary hover:border-primary hover:text-white transition ${active === card.href ? 'bg-primary border-primary text-white rounded-[10px]' : 'bg-white border-primary text-primary'}`} href={card.href} >
                  {card.icon} {card.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="grow">
          <div className="w-full py-10">
            <div className="container-fluid">
              <div className="device-frame relative flex flex-col justify-between w-full h-full bg-[#222831] border-5 border-[rgba(0,0,0,0.5)] rounded-[25px] overflow-hidden pb-[60px]">
                <div className="device-head flex items-center justify-between px-4 h-7 bg-[rgba(0,0,0,0.5)] pb-[5px]">
                  <h4 className="text-lg font-bold tracking-widest bg-clip-text text-transparent mb-0 text-center" style={gradientStyle}>{links.find(link => link.href === active)?.title}</h4>
                  <ul className="device-head-dots flex items-center justify-end gap-1"><li className="w-2 h-2 rounded-full bg-white/50 shrink-0"></li><li className="w-2 h-2 rounded-full bg-[rgba(255,255,255,0.5)] shrink-0"></li><li className="w-2 h-2 rounded-full bg-[rgba(255,255,255,0.5)] shrink-0"></li></ul>
                </div>
                <div className="w-full h-full overflow-y-auto">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeStackLayout;
