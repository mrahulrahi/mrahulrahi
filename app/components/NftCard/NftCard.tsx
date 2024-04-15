import './NftCard.css'

const nftCard = () => {
    return (
        <>
            <div className="nftcard-list d-flex flex-wrap">
                <div className="nftcard-item">
                    <div className="nftcard-box d-flex flex-column">
                        <div className="nftcard-image">
                            <img src="https://lh3.googleusercontent.com/pw/ABLVV86BkvPqD8HnZ2Ls3ud3Yi3r4E_bgkjrYW3s_qnv-RnOxZALZN4Qppup819MtYW54zqqJWw-BwA5Jgnsgf7EtzXZGhoBd3xJOdTvVasnlMzQiKRib1sSIMaKz-6nREmpLlyES1ovk_QhIFJ9vfsUxIs4=w1196-h898-s-no-gm?authuser=0" alt="" />
                        </div>
                        <div className="nftcard-text">
                            <h4>Diya</h4>
                            <p>Dipawali lighting Diyas.</p>
                        </div>
                        <div className="nftcard-cta mt-auto">
                            <ul className="nftcard-cta-list d-flex align-items-center justify-content-between">
                                <li className="nftcard-cta-item d-flex align-items-center"><img src="/icon-ethereum.svg"
                                    alt="" /> 0.041 ETH</li>
                                <li className="nftcard-cta-item d-flex align-items-center"><img src="/icon-clock.svg"
                                    alt="" />3 days left</li>
                            </ul>
                            <div className="nftcard-avatar d-flex align-items-center">
                                <img src="/image-avatar.jpg" alt="" />
                                <p>Creation of <span>Rahul Maurya</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="nftcard-item">
                    <div className="nftcard-box d-flex flex-column">
                        <div className="nftcard-image">
                            <img
                                src="https://lh3.googleusercontent.com/pw/ABLVV86TumQujzkj4fJ8-38Nu5lxnoLi1ot3gWetNGHNNKdbpk71cyBO4RNiy9-EtgT2YkTPU0rDKaXuDl0u3szuGlZdkLTBFRvodkLt-XOKxoskeqpxz068Adz0HN3BS7lhflDu4IDXw2r9HN68p461ndnx=w1196-h898-s-no-gm?authuser=0"
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
                                <img src="/image-avatar.jpg" alt="" />
                                <p>Creation of <span>Rahul Maurya</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default nftCard