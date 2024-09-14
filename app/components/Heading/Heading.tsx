import { ReactNode } from 'react';
import './Heading.css'
interface Props {
    children?: ReactNode;
    heading: string;
}

const Heading = ({ heading, children }: Props) => {
    return (
        <>
            <div className="heading d-flex flex-wrap justify-content-between align-items-end gap-4" data-aos="fade-up">
                <h3>{heading}</h3>
                <div className="heading-right">
                    {children}
                </div>
            </div>
        </>
    )
}

export default Heading