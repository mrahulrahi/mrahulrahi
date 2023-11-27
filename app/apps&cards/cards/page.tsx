import React from 'react'

const cards = () => {
  return (
    <div>



     





      <section className="modal-content-container">

        <div id="resmenuModal" className="modal">
          <div className="modal-content">
            <div className="modal-head">
              <div className="modal-head-content">
                <span>Add Responsive Menu</span>
              </div>
            </div>

            <div className="modal-body">
              <label for="title">Title</label>
              <input id="title" type="text" />
              <br />

              <label for="content">Content</label>
              <input id="content" type="text" />
              <div className="modal-btn-box d-flex gap-1 justify-content-center">
                <button className="btn btn-default confirm-btn" type="button" name="button" onclick="addResmenu()">
                  Confirm
                </button>
                <button className="btn btn-default close-btn" type="button" name="button" onclick="closeResmenuBtn()">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

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

        <div id="nftcardModal" className="modal">
          <div className="modal-content">
            <div className="modal-head">
              <div className="modal-head-content">
                <span>Add NFT Card</span>
              </div>
            </div>

            <div className="modal-body">
              <label for="image">Image Url</label>
              <input id="nft-image" type="text" />
              <br />
              <label for="title">Title</label>
              <input id="nft-title" type="text" />
              <br />

              <label for="content">Content</label>
              <input id="nft-content" type="text" />

              <label for="price">Price</label>
              <input id="nft-price" type="text" />

              <label for="time">Time</label>
              <input id="nft-time" type="text" />

              <label for="creator">Creator</label>
              <input id="nft-creator" type="text" />
              <div className="modal-btn-box d-flex gap-1 justify-content-center">
                <button className="btn btn-default confirm-btn" type="button" name="button" onclick="addNftcard()">
                  Confirm
                </button>
                <button className="btn btn-default close-btn" type="button" name="button" onclick="closeNftcardBtn()">
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

export default cards