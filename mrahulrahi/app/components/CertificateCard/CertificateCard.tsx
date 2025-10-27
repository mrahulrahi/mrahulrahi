import './CertificateCard.css'
import Link from "next/link"
import * as SiIcons from "react-icons/si";
import GradientIcon from "./GradientIcon";

interface Prpos {
    item: Item;
}

interface Item {
    id: number;
    title: string;
    url: string;
    organization: string;
    icon: string;
}

const CertificateCard = ({ item }: Prpos) => {
    const IconComponent = SiIcons[item.icon as keyof typeof SiIcons];

    return (
        <>
            <Link className="certificate-card-box d-flex" href={item.url}>
                <div className="certificate-card-text">
                    <h4>{item.title}</h4>
                    <p>{item.organization}</p>
                    <div className="certificate-card-icon"> <GradientIcon iconName={item.icon} size={100} uniqueId={item.id.toString()} /></div>
                </div>
            </Link>
        </>
    )
}

export default CertificateCard