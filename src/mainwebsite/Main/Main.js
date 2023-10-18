import React from 'react'
import WelcomeSection from '../Components/Pages/WelcomeSection';
import PlansSection from '../Components/Pages/PlansSection';
import ContactSection from '../Components/Pages/ContactSection';
import FunctionnalitySection from '../Components/Pages/FunctionnalitySection';
import TemplatesSection from '../Components/Pages/TemplatesSection';
import Footer from '../Components/Footer/Footer';

const Main = () => {
  return (
    <div>
        <WelcomeSection/>
        <FunctionnalitySection/>
        <TemplatesSection/>
        <PlansSection/>
        <ContactSection/>
        <Footer/>
    </div>
  )
}

export default Main