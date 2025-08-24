import InnerHero from '../../components/InnerHero/InnerHero'
import { IoIosArrowDroprightCircle } from "react-icons/io";
import Button from '../../components/Button';
import Heading from '../../components/Heading';
import ContentContainer from '../../components/ContentContainer';
import WorkCard from '../../components/WorkCard/WorkCard';
import { projectsCards } from "../../data/staticData";
import MouseFollower from '../../components/MouseFollower';


const HeroHeading = () => {
  return (<>
    My <span className="bg-clip-text bg-gradient-1">Portfolio</span>
  </>)
}

const Portfolio = () => {

  return (
    <>
      <InnerHero heading={<HeroHeading />} bgImage='/inner-hero-img.jpg'>
        <Button title='📽️ FireLiquidator' style='default' target='_blank' url='https://www.youtube.com/@fireliquidator' icon={<IoIosArrowDroprightCircle />} />
        <Button title='📷 Rahi Creations' style='default' target='_blank' url='https://gurushots.com/rahicreations' icon={<IoIosArrowDroprightCircle />} />
      </InnerHero>

      <ContentContainer background='gradient-2' id='work'>
        <div className="itb-content-box bg-gradient-1" data-aos="fade-up" suppressHydrationWarning>
          <Heading heading='My Work' />

          <div className="work-list d-flex flex-wrap">
            {projectsCards.map(card => (
              <div key={card.id} className="work-item" data-aos="fade-up" suppressHydrationWarning>
                <WorkCard card={card} />
              </div>
            ))}
          </div>
        </div>
      </ContentContainer>


      <MouseFollower />
    </>
  )
}

export default Portfolio;
