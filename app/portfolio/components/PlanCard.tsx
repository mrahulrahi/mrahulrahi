import React from 'react'

const PlanCard = () => {
    return (

        <div className="content-container bg-gold">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="content-box d-flex flex-wrap">
                            <div className="heading">
                                <h3>Components</h3>
                            </div>

                            <div className="plan-list">
                                <article className="plan glass-bg">
                                    <h4 className="plan-title">FREE</h4>
                                    <h5 className="plan-price">$0/month</h5>
                                    <h6>For hobby projects or small teams.</h6>
                                    <ul className="plan-features">
                                        <li className="plan-feature">1 Workspace</li>
                                        <li className="plan-feature">Unlimited Traffic</li>
                                        <li className="plan-feature">10GB Storage</li>
                                        <li className="plan-feature">Basic Support</li>
                                    </ul>
                                    <div>
                                        <button className="btn btn-default">CHOOSE PLAN</button>
                                    </div>
                                </article>
                                <article className="plan plan-highlighted glass-bg">
                                    <h4 className="plan-annotation">RECOMMENDED</h4>
                                    <h4 className="plan-title">PLUS</h4>
                                    <h5 className="plan-price">$29/month</h5>
                                    <h6>For ambitious projects.</h6>
                                    <ul className="plan-features">
                                        <li className="plan-feature">5 Workspaces</li>
                                        <li className="plan-feature">Unlimited Traffic</li>
                                        <li className="plan-feature">100GB Storage</li>
                                        <li className="plan-feature">Plus Support</li>
                                    </ul>
                                    <div>
                                        <button className="btn btn-default">CHOOSE PLAN</button>
                                    </div>
                                </article>
                                <article className="plan glass-bg">
                                    <h4 className="plan-title">PREMIUM</h4>
                                    <h5 className="plan-price">$99/month</h5>
                                    <h6>Your enterprise solution.</h6>
                                    <ul className="plan-features">
                                        <li className="plan-feature">10 Workspaces</li>
                                        <li className="plan-feature">Unlimited Traffic</li>
                                        <li className="plan-feature">Unlimited Storage</li>
                                        <li className="plan-feature">Priority Support</li>
                                    </ul>
                                    <div>
                                        <button className="btn btn-default">CHOOSE PLAN</button>
                                    </div>
                                </article>
                            </div>

                            <div id="key-features" className="glass-bg">
                                <h1 className="section-title">Many Good Reasons to Stick Around</h1>
                                <ul className="key-feature-list d-flex flex-wrap">
                                    <li className="key-feature-item">
                                        <div className="key-feature-box d-flex flex-column align-items-center justify-content-center">
                                            <div className="key-feature-image">
                                                <img src="/feature-img-1.png" alt="" />
                                            </div>
                                            <div className="key-feature-description">3,857,000 Trusting Customers</div>
                                        </div>
                                    </li>
                                    <li className="key-feature-item">
                                        <div className="key-feature-box d-flex flex-column align-items-center justify-content-center">
                                            <div className="key-feature-image">
                                                <img src="/feature-img-2.png" alt="" />
                                            </div>
                                            <div className="key-feature-description">Receive on time</div>
                                        </div>
                                    </li>
                                    <li className="key-feature-item">
                                        <div className="key-feature-box d-flex flex-column align-items-center justify-content-center">
                                            <div className="key-feature-image">
                                                <img src="/feature-img-3.png" alt="" />
                                            </div>
                                            <div className="key-feature-description">Lightning Fast CDN</div>
                                        </div>
                                    </li>
                                    <li className="key-feature-item">
                                        <div className="key-feature-box d-flex flex-column align-items-center justify-content-center">
                                            <div className="key-feature-image">
                                                <img src="/feature-img-4.png" alt="" />
                                            </div>
                                            <div className="key-feature-description">Fixed Price Projects</div>
                                        </div>
                                    </li>
                                    <li className="key-feature-item">
                                        <div className="key-feature-box d-flex flex-column align-items-center justify-content-center">
                                            <div className="key-feature-image">
                                                <img src="/feature-img-5.png" alt="" />
                                            </div>
                                            <div className="key-feature-description">99.999% Uptime Guarantee</div>
                                        </div>
                                    </li>
                                    <li className="key-feature-item">
                                        <div className="key-feature-box d-flex flex-column align-items-center justify-content-center">
                                            <div className="key-feature-image">
                                                <img src="/feature-img-6.png" alt="" />
                                            </div>
                                            <div className="key-feature-description">Highly Skilled</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlanCard