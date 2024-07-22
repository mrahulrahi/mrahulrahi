import React from 'react'
import ContentContainer from './components/ContentContainer'

const loading = () => {
  return (
    <ContentContainer className="position-relative min-vh-100" background="green">
        <div className="position-absolute top-0 start-0 w-100 h-100"><img className="w-100 h-100 object-fit-cover" src="/loading.gif" alt="" /></div>
    </ContentContainer>
  )
}

export default loading