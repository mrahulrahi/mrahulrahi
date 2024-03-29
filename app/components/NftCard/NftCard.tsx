import './NftCard.css'

const nftCard = () => {
    return (
        <>
            <div className="content-container bg-gold">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="content-box d-flex flex-wrap glass-bg">
                                <div className="heading d-flex flex-wrap justify-content-between align-items-center">
                                    <h3>NFT Card</h3>
                                    <div className="btn-holder">
                                        <button className="btn btn-default btn-green" type="button" name="button">
                                            Add NFT Card
                                        </button>
                                    </div>
                                </div>
                                <div className="nftcard-list d-flex flex-wrap">
                                    <div className="nftcard-item">
                                        <div className="nftcard-box d-flex flex-column">
                                            <div className="nftcard-image">
                                                <img src="/image-equilibrium.jpg" alt="" />
                                            </div>
                                            <div className="nftcard-text">
                                                <h4>Equilibrium #3429</h4>
                                                <p>Our Equilibrium collection promotes balance and calm.</p>
                                            </div>
                                            <div className="nftcard-cta mt-auto">
                                                <ul className="nftcard-cta-list d-flex align-items-center justify-content-between">
                                                    <li className="nftcard-cta-item d-flex align-items-center"><img src="/icon-ethereum.svg"
                                                        alt="" /> 0.041 ETH</li>
                                                    <li className="nftcard-cta-item d-flex align-items-center"><img src="/icon-clock.svg"
                                                        alt="" />3 days left</li>
                                                </ul>
                                                <div className="nftcard-avatar d-flex align-items-center">
                                                    <img src="/image-avatar.png" alt="" />
                                                    <p>Creation of <span>Jules Wyvern</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="nftcard-item">
                                        <div className="nftcard-box d-flex flex-column">
                                            <div className="nftcard-image">
                                                <img
                                                    src="https://cdn.dribbble.com/users/383277/screenshots/18055765/media/e5fc935b60035305099554810357012a.png"
                                                    alt="" />
                                            </div>
                                            <div className="nftcard-text">
                                                <h4>Skelton #4551</h4>
                                                <p>Best NFT in the market.</p>
                                            </div>
                                            <div className="nftcard-cta mt-auto">
                                                <ul className="nftcard-cta-list d-flex align-items-center justify-content-between">
                                                    <li className="nftcard-cta-item d-flex align-items-center"><img src="/icon-ethereum.svg"
                                                        alt="" /> 0.045 ETH</li>
                                                    <li className="nftcard-cta-item d-flex align-items-center"><img src="/icon-clock.svg"
                                                        alt="" />7 days left</li>
                                                </ul>
                                                <div className="nftcard-avatar d-flex align-items-center">
                                                    <img src="/image-avatar.png" alt="" />
                                                    <p>Creation of <span>Rahi</span></p>
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


            <section className="modal-content-container">

                <div id="nftcardModal" className="modal">
                    <div className="modal-content">
                        <div className="modal-head">
                            <div className="modal-head-content">
                                <span>Add NFT Card</span>
                            </div>
                        </div>

                        <div className="modal-body">
                            <label htmlFor="image">Image Url</label>
                            <input id="nft-image" type="text" />
                            <br />
                            <label htmlFor="title">Title</label>
                            <input id="nft-title" type="text" />
                            <br />

                            <label htmlFor="content">Content</label>
                            <input id="nft-content" type="text" />

                            <label htmlFor="price">Price</label>
                            <input id="nft-price" type="text" />

                            <label htmlFor="time">Time</label>
                            <input id="nft-time" type="text" />

                            <label htmlFor="creator">Creator</label>
                            <input id="nft-creator" type="text" />
                            <div className="modal-btn-box d-flex gap-1 justify-content-center">
                                <button className="btn btn-default confirm-btn" type="button" name="button">
                                    Confirm
                                </button>
                                <button className="btn btn-default close-btn" type="button" name="button">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default nftCard