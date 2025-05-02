import './CertificateCard.css'
import Link from "next/link"

interface Prpos{
    item :Item;
}

interface Item{
    id : number;
    title : string;
    url :string;
    organization : string;
}

const CertificateCard = ({item} : Prpos) => {
    return (
        <>
            <Link className="certificate-card-box d-flex" href={item.url}>
                <div className="certificate-card-text">
                    <h4>{item.title}</h4>
                    <p>{item.organization}</p>
                    <div className="certificate-card-big-text">{item.organization}</div>
                </div>
            </Link>
        </>
    )
}

export default CertificateCard