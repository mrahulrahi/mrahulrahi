import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const CountUp = dynamic(() => import("react-countup"), { ssr: false });

const StatCard = ({
    icon,
    countEnd,
    suffix,
    description,
}: {
    icon: JSX.Element;
    countEnd: number;
    suffix: string;
    description: string;
}) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Set the state to true only after the component is mounted on the client
        setIsClient(true);
    }, []);

    return (
        <li className="stats-item">
            <div className="stats-box d-flex gap-4 align-items-center">
                <div className="stats-icon d-flex align-items-center justify-content-center">{icon}</div>
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
