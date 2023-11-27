import React from 'react'

const serviceCard = () => {
    return (
        <div>
            <div className="content-container bg-green">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="content-box d-flex flex-wrap glass-bg">
                                <div className="heading d-flex flex-wrap justify-content-between align-items-center">
                                    <h3>Service Card</h3>
                                    <div className="btn-holder">
                                        <button className="btn btn-default" type="button" name="button" onclick="showAddQrcardModal()">
                                            Add Service Card
                                        </button>
                                    </div>
                                </div>
                                <div className="service-card-list d-flex flex-wrap">
                                    <div className="service-card-item">
                                        <div className="service-card-box d-flex flex-column glass-bg">
                                            <div className="service-card-img">
                                                <img src="/web-design.png" alt="" />
                                            </div>
                                            <div className="service-card-text">
                                                <h4>Web Design</h4>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                                                    tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                                                </p>
                                            </div>
                                            <div className="service-card-btn mt-auto">
                                                <a className="btn btn-default" href="">LEARN MORE</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="service-card-item">
                                        <div className="service-card-box d-flex flex-column glass-bg">
                                            <div className="service-card-img">
                                                <img src="/app-design.png" alt="" />
                                            </div>
                                            <div className="service-card-text">
                                                <h4>App Design</h4>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                                                    tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                                                </p>
                                            </div>
                                            <div className="service-card-btn mt-auto">
                                                <a className="btn btn-default" href="">LEARN MORE</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="service-card-item">
                                        <div className="service-card-box d-flex flex-column glass-bg">
                                            <div className="service-card-img">
                                                <img src="/graphic-design.png" alt="" />
                                            </div>
                                            <div className="service-card-text">
                                                <h4>Graphic Design</h4>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                                                    tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                                                </p>
                                            </div>
                                            <div className="service-card-btn mt-auto">
                                                <a className="btn btn-default" href="">LEARN MORE</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="service-card-item">
                                        <div className="service-card-box d-flex flex-column glass-bg">
                                            <div className="service-card-img">
                                                <img src="/photography.png" alt="" />
                                            </div>
                                            <div className="service-card-text">
                                                <h4>Photography</h4>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                                                    tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                                                </p>
                                            </div>
                                            <div className="service-card-btn mt-auto">
                                                <a className="btn btn-default" href="">LEARN MORE</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="service-card-item">
                                        <div className="service-card-box d-flex flex-column glass-bg">
                                            <div className="service-card-img">
                                                <img src="/hostingry.png" alt="" />
                                            </div>
                                            <div className="service-card-text">
                                                <h4>Hostingry</h4>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                                                    tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                                                </p>
                                            </div>
                                            <div className="service-card-btn mt-auto">
                                                <a className="btn btn-default" href="">LEARN MORE</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="service-card-item">
                                        <div className="service-card-box d-flex flex-column glass-bg">
                                            <div className="service-card-img">
                                                <img src="/phonesmania.png" alt="" />
                                            </div>
                                            <div className="service-card-text">
                                                <h4>PhonesMania</h4>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                                                    tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                                                </p>
                                            </div>
                                            <div className="service-card-btn mt-auto">
                                                <a className="btn btn-default" href="">LEARN MORE</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default serviceCard