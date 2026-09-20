import './CertificateCard.css';
import Link from "next/link";
import GradientIcon from "./GradientIcon";
import { CheckCircle2, ExternalLink } from "lucide-react";

interface Props {
  item: Item;
}

interface Item {
  id: number;
  title: string;
  url: string;
  organization: string;
  icon: string;
}

const CertificateCard = ({ item }: Props) => {
  return (
    <Link
      className="certificate-card-box d-flex flex-column justify-content-between"
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="certificate-card-top d-flex align-items-center justify-content-between mb-3">
        <div className="cert-org-badge d-inline-flex align-items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
          <span>{item.organization}</span>
        </div>
        <div className="cert-verify-link d-inline-flex align-items-center gap-1">
          <span>Verify</span>
          <ExternalLink className="w-3 h-3" />
        </div>
      </div>

      <div className="certificate-card-text">
        <h4>{item.title}</h4>
      </div>

      <div className="certificate-card-icon">
        <GradientIcon iconName={item.icon} size={110} uniqueId={item.id.toString()} />
      </div>
    </Link>
  );
};

export default CertificateCard;