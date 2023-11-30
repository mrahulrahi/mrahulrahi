import React from 'react'
import BlockCard from './BlockCard'
interface Prpos {
  id: number,
  title: string,
  url: string,
}


const AppsCardsPage = () => {
  const cards = [{ id: 1, title: 'Calculator UI', url: '/aerocPage/apps'},
  { id: 2, title: 'Gradient BG', url: '/aerocPage/apps'},
  { id: 3, title: 'Notes App', url: '/aerocPage/apps'},
  { id: 4, title: 'Quiz Game', url: '/aerocPage/apps'},
  { id: 5, title: 'Responsive Menu', url: '/aerocPage/cards'},
  { id: 6, title: 'Responsive Cards', url: '/aerocPage/cards'},
  { id: 7, title: 'NFT Card', url: '/aerocPage/cards'},
  { id: 8, title: 'Service Card', url: '/aerocPage/cards'},
  { id: 9, title: 'Team Component', url: '/aerocPage/compo'},
  { id: 10, title: 'Contact Component', url: '/aerocPage/compo'},
  { id: 11, title: 'Login Component', url: '/aerocPage/compo'},
  { id: 12, title: 'Service Card', url: '/aerocPage/compo'}] 

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