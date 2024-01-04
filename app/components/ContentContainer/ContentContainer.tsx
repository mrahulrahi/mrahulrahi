import React from 'react'

interface Props{
    child : JSX.Element;
}

const Container = ({ child } : Props) => {
    return (
        <>
            <div className="content-container bg-green">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">

                            {child}


                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Container