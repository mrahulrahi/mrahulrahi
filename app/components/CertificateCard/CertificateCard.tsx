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
            <Link className="card-box d-flex" href={item.url}>
                <div className="card-text mt-auto">
                    <h4>{item.title}</h4>
                    <p>{item.organization}</p>
                </div>
            </Link>
        </>
    )
}

export default CertificateCard