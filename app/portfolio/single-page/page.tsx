import React from 'react'
import TextImageBlock from '../components/TextImageBlock/TextImageBlock'
import ContactForm from '../components/ContactForm/ContactForm'
import TeamCard from '../components/TeamCard'
import TextCard from '../components/TextCard'
import PlanCard from '../components/PlanCard'
import SignupForm from '../components/SignupForm/SignupForm'
import LoginForm from '../components/LoginForm/LoginForm'
import ResMenuCard from '../components/ResMenuCard/ResMenuCard'
import ResCard from '../components/ResCard/ResCard'
import NftCard from '../components/NftCard/NftCard'
import ServiceCard from '../components/ServiceCard/ServiceCard'

const SinglePage = () => {
  return (
    <div>

      <TextImageBlock />

      <ContactForm />

      <TeamCard />

      <TextCard />

      <PlanCard />

      <SignupForm />

      <LoginForm />

      <ResMenuCard />

      <ResCard />

      <NftCard />

      <ServiceCard />
      
    </div>
  )
}

export default SinglePage