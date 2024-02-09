import ContactForm from '../../components/ContactForm/ContactForm'
import SignupForm from '../../components/SignupForm/SignupForm'
import LoginForm from '../../components/LoginForm/LoginForm'
import ResMenuCard from '../../components/ResMenuCard/ResMenuCard'
import NftCard from '../../components/NftCard/NftCard'
import FoodCard from '@/app/components/FoodCard/FoodCard'


const SinglePage = () => {
  return (
    <>
      <ContactForm />

      <SignupForm />

      <LoginForm />

      <ResMenuCard />

      <NftCard />

      <FoodCard />
    </>
  )
}

export default SinglePage