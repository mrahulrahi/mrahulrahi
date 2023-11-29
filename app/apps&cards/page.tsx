import React from 'react'
import BlockCard from './BlockCard'
interface Prpos {
  id: number,
  title: string,
  url: string,
}


const AppsCardsPage = () => {
  const cards = [{ id: 1, title: 'Calculator UI', url: '/apps&cards/apps'},
  { id: 2, title: 'Gradient BG', url: '/apps&cards/apps'},
  { id: 3, title: 'Notes App', url: '/apps&cards/apps'},
  { id: 4, title: 'Quiz Game', url: '/apps&cards/apps'},
  { id: 5, title: 'Responsive Menu', url: '/apps&cards/cards'},
  { id: 6, title: 'Responsive Cards', url: '/apps&cards/cards'},
  { id: 7, title: 'NFT Card', url: '/apps&cards/cards'},
  { id: 8, title: 'Service Card', url: '/apps&cards/cards'},
  { id: 9, title: 'Team Component', url: '/apps&cards/compo'},
  { id: 10, title: 'Contact Component', url: '/apps&cards/compo'},
  { id: 11, title: 'Login Component', url: '/apps&cards/compo'},
  { id: 12, title: 'Service Card', url: '/apps&cards/compo'}] 

  return (
    <div>
      <div className="content-container bg-green">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="content-box d-flex flex-wrap">
                <div className="heading flex-wrap d-flex justify-content-between align-items-center">
                  <h3>All Elements</h3>
                  <a href="" className="btn btn-default">View All</a>
                </div>
                <BlockCard items ={cards} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppsCardsPage