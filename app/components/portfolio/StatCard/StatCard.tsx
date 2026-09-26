import { useEffect, useState, JSX } from "react";
import dynamic from "next/dynamic";
import { renderIcon } from "@/app/components/portfolio/icons";

const CountUp = dynamic(() => import("react-countup"), { ssr: false });

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
        setIsClient(true);
    }, []);

    const renderedIcon = typeof icon === 'object' ? icon : renderIcon(icon);

    return (
        <li className="stats-item">
            <div className="stats-box d-flex gap-4 align-items-center">
                <div className="stats-icon d-flex align-items-center justify-content-center" aria-hidden="true">{renderedIcon}</div>
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
