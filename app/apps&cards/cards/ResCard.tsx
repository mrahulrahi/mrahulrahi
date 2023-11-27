import React from 'react'

const ResCard = () => {
    return (
        <div>
            <div className="content-container bg-green">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="content-box d-flex flex-wrap glass-bg">
                                <div className="heading d-flex flex-wrap justify-content-between align-items-center">
                                    <h3>Responsive Cards</h3>
                                    <div className="btn-holder">
                                        <button className="btn btn-default" type="button" name="button" onclick="showAddRescardModal()">
                                            Add Responsive Card
                                        </button>
                                    </div>
                                </div>
                                <div className="rescard-list d-flex flex-wrap">
                                    <div className="rescard-item">
                                        <div className="rescard-box">
                                            <div className="rescard-img">
                                                <img src="/new-york.jpg" alt="Sunset in New York" />
                                            </div>
                                            <div className="rescard-text">
                                                <h4>New York</h4>
                                                <p>One of the most vibrant cities you can visit - a trip no one should
                                                    miss!</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rescard-item">
                                        <div className="rescard-box">
                                            <div className="rescard-img">
                                                <img src="/kuala-lumpur.jpg" alt="Sunset in New York" />
                                            </div>
                                            <div className="rescard-text">
                                                <h4>Kuala Lumpur</h4>
                                                <p>One of the most vibrant cities you can visit - a trip no one should
                                                    miss!</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rescard-item">
                                        <div className="rescard-box">
                                            <div className="rescard-img">
                                                <img src="/hong-kong.jpg" alt="Sunset in New York" />
                                            </div>
                                            <div className="rescard-text">
                                                <h4>Hong Kong</h4>
                                                <p>One of the most vibrant cities you can visit - a trip no one should
                                                    miss!</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rescard-item">
                                        <div className="rescard-box">
                                            <div className="rescard-img">
                                                <img src="/singapore.jpg" alt="Sunset in New York" />
                                            </div>
                                            <div className="rescard-text">
                                                <h4>Singapore</h4>
                                                <p>One of the most vibrant cities you can visit - a trip no one should
                                                    miss!</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rescard-item">
                                        <div className="rescard-box">
                                            <div className="rescard-img">
                                                <img src="/mumbai.jpg" alt="" />
                                            </div>
                                            <div className="rescard-text">
                                                <h4>Mumbai</h4>
                                                <p>Scan the QR code to visit Frontend Mentor and take your coding skills to the next level</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <section className="modal-content-container">

                <div id="rescardModal" className="modal">
                    <div className="modal-content">
                        <div className="modal-head">
                            <div className="modal-head-content">
                                <span>Add Responsive Card</span>
                            </div>
                        </div>

                        <div className="modal-body">
                            <label for="image">Image Url</label>
                            <input id="image" type="text" />
                            <br />
                            <label for="title">Title</label>
                            <input id="res-title" type="text" />
                            <br />

                            <label for="content">Content</label>
                            <input id="res-content" type="text" />
                            <div className="modal-btn-box d-flex gap-1 justify-content-center">
                                <button className="btn btn-default confirm-btn" type="button" name="button" onclick="addRescard()">
                                    Confirm
                                </button>
                                <button className="btn btn-default close-btn" type="button" name="button" onclick="closeRescardBtn()">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ResCard