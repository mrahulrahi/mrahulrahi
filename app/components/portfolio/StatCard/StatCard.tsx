import { useEffect, useState, JSX } from "react";
import dynamic from "next/dynamic";

const CountUp = dynamic(() => import("react-countup"), { ssr: false });

import * as FaIcons from "react-icons/fa6";
import * as FaIconsReg from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as LuIcons from "react-icons/lu";
import * as BiIcons from "react-icons/bi";
import * as TbIcons from "react-icons/tb";
import * as SiIcons from "react-icons/si";

const iconPacks: Record<string, any> = {
    ...FaIcons,
    ...FaIconsReg,
    ...MdIcons,
    ...LuIcons,
    ...BiIcons,
    ...TbIcons,
    ...SiIcons,
};

const StatCard = ({
    icon,
    countEnd,
    suffix,
    description,
}: {
    icon: JSX.Element | string;
    countEnd: number;
    suffix: string;
    description: string;
}) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Set the state to true only after the component is mounted on the client
        setIsClient(true);
    }, []);

    let renderedIcon = typeof icon === 'string' ? null : icon;
    if (typeof icon === 'string') {
        const IconComponent = iconPacks[icon];
        if (IconComponent) {
            renderedIcon = <IconComponent />;
        }
    }

    return (
        <li className="stats-item">
            <div className="stats-box d-flex gap-4 align-items-center">
                <div className="stats-icon d-flex align-items-center justify-content-center">{renderedIcon}</div>
                <div className="stats-content">
                    {/* Render CountUp only when on the client */}
                    {isClient ? (
                        <div className="stats-count d-flex align-items-center">
                            <CountUp start={0} end={countEnd} duration={4} suffix={suffix} />
                        </div>
                    ) : (
                        // Placeholder to avoid hydration mismatch
                        <div className="stats-count d-flex align-items-center">0{suffix}</div>
                    )}
                    <div className="stats-description">{description}</div>
                </div>
            </div>
        </li>
    );
};

export default StatCard;
