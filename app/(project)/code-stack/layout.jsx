'use client'
import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";
import Link from 'next/link';
import { useGradient } from '@/app/context/GradientContext';
import Hero from "@/app/components/project/Hero";
import { FaDiceFour, FaCalculator, FaNoteSticky, FaCloudSun, FaQuoteRight, FaCreditCard, FaPercent, FaCoins, FaChartLine } from 'react-icons/fa6';
import { getPublicUiToolsData } from '@/app/(admin)/admin/dataActions';

const CodeStackLayout = ({ children }) => {
  const { gradientStyle, changeGradientColor } = useGradient();

  const location = usePathname();
  // Ensure we fall back if location is a string (Next.js usePathname returns string)
  const active = location?.pathname || location || '';
  // Check if we're on the parent route (exact match)
  const isParentPage = active === '/code-stack' || active === '/code-stack/';

  const optionalTools = [
    { title: 'Quiz App', href: '/code-stack/tools/quiz-app', icon: <FaDiceFour /> },
    { title: 'Calculator App', href: '/code-stack/tools/calculator-app', icon: <FaCalculator /> },
    { title: 'Notes App', href: '/code-stack/tools/notes-app', icon: <FaNoteSticky /> },
    { title: 'Weather App', href: '/code-stack/tools/weather-app', icon: <FaCloudSun /> },
    { title: 'Quote App', href: '/code-stack/tools/quote-app', icon: <FaQuoteRight /> },
    { title: 'Salary Calculator', href: '/code-stack/tools/salary-calculator', icon: <FaCalculator /> },
    { title: 'Smart EMI Planner', href: '/code-stack/tools/smart-emi-planner', icon: <FaCalculator /> },
    { title: 'Salary Calculator', href: '/code-stack/tools/salary-calculator-two', icon: <FaCalculator /> },
    { title: 'Expense Tracker', href: '/code-stack/tools/expense-tracker', icon: <FaCreditCard /> },
    { title: 'Salary Divider', href: '/code-stack/tools/salary-divider', icon: <FaPercent /> },
    { title: 'Retirement Planner', href: '/code-stack/tools/retirement-planner', icon: <FaChartLine /> },
  ];

  const [visibleToolHrefs, setVisibleToolHrefs] = useState(optionalTools.map(t => t.href));

  useEffect(() => {
    getPublicUiToolsData().then(data => {
      const visible = (data.tools || [])
        .filter((t) => t.visible)
        .map((t) => t.href);
      setVisibleToolHrefs(visible);
    }).catch(err => {
      console.error("Failed to load visible tools", err);
    });
  }, []);

  const links = optionalTools.filter(tool => visibleToolHrefs.includes(tool.href));

  // Hero configuration based on current route
  const getHeroConfig = () => {
    if (isParentPage) {
      return {
        bgImg: "https://picsum.photos/1920/1000?random=5",
        title: "Start Coding",
        subTitle: "Code Stack",
      };
    }

    return {
      title: links.find(link => link.href === active)?.title || "Code Stack",
      subTitle: "Essential Tools & Resources",
      gradientColor: gradientStyle
    };
  };

  const heroConfig = getHeroConfig();

  return (
    <>
      <Hero bgImg={heroConfig.bgImg} title={heroConfig.title} subTitle={heroConfig.subTitle} gradientColor={heroConfig.gradientColor} />

      <div className="w-full">
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
    </>
  );
};

export default CodeStackLayout;
