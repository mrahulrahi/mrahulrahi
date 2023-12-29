import React from 'react'
import TextImageBlock from './TextImageBlock'
import ContactForm from './ContactForm'
import TeamCard from './TeamCard'
import TextCard from './TextCard'
import PlanCard from './PlanCard'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm/LoginForm'

const compo = () => {
  return (
    <div>

      <TextImageBlock />

      <ContactForm />

      <TeamCard />

      <TextCard />

      <PlanCard />

      <SignupForm />

      <LoginForm />
    </div>
  )
}

export default compo