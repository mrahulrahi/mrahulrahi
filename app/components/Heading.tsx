import { ReactNode } from 'react';
interface Props {
    children?: ReactNode;
    heading: string;
}

const Heading = ({ heading, children }: Props) => {
    return (
        <>
            <div className="heading d-flex flex-wrap justify-content-between align-items-end gap-4" data-aos="fade-up">
                <div className="heading-left">
                    <h3>{heading}</h3>
                    <div className="heading-underline"></div>
                </div>
                {children && <div className="heading-right">
                    {children}
                </div>}
            </div>
        </>
    )
}

export default Heading