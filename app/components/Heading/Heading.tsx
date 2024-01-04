import './Heading.css'
interface Props {
    heading : string;
}

const Heading = ({heading} : Props) => {
    return (
        <>
            <div className="heading d-flex justify-content-between align-items-end">
                <h3>{heading}</h3>
               
            </div>
        </>
    )
}

export default Heading