import './style.css'
import Banner from './components/Banner/Banner'
import BlockCard from './components/BlockCard/BlockCard'
import InnerHero from '../components/InnerHero/InnerHero'
import { IoIosArrowDroprightCircle } from "react-icons/io";
import Button from '../components/Button/Button';
import Heading from '../components/Heading/Heading';
import ContentContainer from '../components/ContentContainer/ContentContainer';

const HeroHeading = () => {
  return (<>
    My <span>Portfolio</span>
  </>)
}

const HeroSubHeading = () => {
  return (<>
    
  </>)
}



const Portfolio = () => {
  const cards = [{ id: 1, title: 'Calculator UI', url: '/portfolio/apps' },
  { id: 2, title: 'Gradient BG', url: '/portfolio/apps' },
  { id: 3, title: 'Notes App', url: '/portfolio/apps' },
  { id: 4, title: 'Quiz Game', url: '/portfolio/apps' },
  { id: 5, title: 'Responsive Menu', url: '/portfolio/cards' },
  { id: 6, title: 'Responsive Cards', url: '/portfolio/cards' },
  { id: 7, title: 'NFT Card', url: '/portfolio/cards' },
  { id: 8, title: 'Service Card', url: '/portfolio/cards' },
  { id: 9, title: 'Team Component', url: '/portfolio/compo' },
  { id: 10, title: 'Contact Component', url: '/portfolio/compo' },
  { id: 11, title: 'Login Component', url: '/portfolio/compo' },
  { id: 12, title: 'Service Card', url: '/portfolio/compo' }]

  const videoCards = [{ id: 1, title: 'OnePlus 8 | B-roll | Cinematic Shots', url: 'https://www.youtube.com/embed/O3zRzznPFA4' },
  { id: 2, title: 'OnePlus NORD | B-roll | Cinematic Shots', url: 'https://www.youtube.com/embed/KVPr-Q-cloY' },
  { id: 3, title: 'Xiaomi Mi 10i | B-roll | Cinematic Shots', url: 'https://www.youtube.com/embed/vNFb5rk77Pg' },
  { id: 4, title: 'OnePlus NORD Vs OnePlus 8 | Camera Comparison', url: 'https://www.youtube.com/embed/1fiuAE0bRDY' },
  { id: 5, title: '5 OnePlus Benefits | Red Cable Club Membership', url: 'https://www.youtube.com/embed/Kb-tjX9orj0' },
  { id: 5, title: 'Cinematic B-roll | OnePlus Bullets Wireless Z', url: 'https://www.youtube.com/embed/4OHGr67Xiag' },
  { id: 5, title: 'Cinematic B-roll | Asus ROG Strix G15 531GT', url: 'https://www.youtube.com/embed/tb1pmAbIlKg' },
  { id: 5, title: 'Apps Review | YMUSIC | Fire Liquidator', url: 'https://www.youtube.com/embed/xnavnMUQjkE' },]

  return (
    <>
      <InnerHero heading={<HeroHeading />} subHeading={<HeroSubHeading />}>
        <Button title='FireLiquidator' style='default' url='/about' icon={<IoIosArrowDroprightCircle />} />
        <Button title='Rahi Creations' style='default' url='/about' icon={<IoIosArrowDroprightCircle />} />
      </InnerHero>



      <div className="content-container bg-gold">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="itb-content-box bg-green">
                <Heading heading='My Project' />
                <div className="work-list">
                  <div className="work-item">
                    <div className="work-box d-flex flex-wrap align-items-center justify-content-between flex-md-row flex-column-reverse bg-violet">
                      <div className="wb-img"> <img src="/project-img-3.png" alt="" /> </div>
                      <div className="wb-text">
                        <h3> WEB DESIGN </h3>
                        <h5> Snowlake Theme </h5>
                        <p> Maecenas faucibus mollis interdum sed posuere consectetur est at
                          lobortis.
                          Scelerisque id ligula porta felis euismod semper. Fusce dapibus tellus
                          cursus.
                        </p>
                        <a href="#" className="link-btn d-flex flex-wrap align-items-center">See
                          Projects <div className="arrow-icon"> <img src="/arrow-icon.svg" />
                          </div></a>
                      </div>
                    </div>
                  </div>
                  <li className="work-item d-flex flex-wrap">
                    <div className="wi-content">
                      <div className="work-box d-flex flex-wrap flex-column-reverse"
                        style={{ background: 'rgb(255 0 0 / 20%)' }}>
                        <div className="wb-img w-100"> <img src="/project-img-1.png" alt="" />
                        </div>
                        <div className="wb-text w-100">
                          <h3> WEB DESIGN </h3>
                          <h5> Snowlake Theme </h5>
                          <p> Maecenas faucibus mollis interdum sed posuere consectetur est at
                            lobortis.
                            Scelerisque id ligula porta felis euismod semper. Fusce dapibus
                            tellus
                            cursus. </p>
                          <a href="#" className="link-btn d-flex flex-wrap align-items-center">See
                            Projects
                            <div className="arrow-icon"> <img src="/arrow-icon.svg" />
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="wi-content">
                      <div className="work-box d-flex flex-wrap flex-column-reverse"
                        style={{ background: 'rgb(10 119 118 / 20%)' }}>
                        <div className="wb-img w-100"> <img src="/project-img-2.png" alt="" />
                        </div>
                        <div className="wb-text w-100">
                          <h3> WEB DESIGN </h3>
                          <h5> Snowlake Theme </h5>
                          <p> Maecenas faucibus mollis interdum sed posuere consectetur est at
                            lobortis.
                            Scelerisque id ligula porta felis euismod semper. Fusce dapibus
                            tellus
                            cursus. </p>
                          <a href="#" className="link-btn d-flex flex-wrap align-items-center">See
                            Projects
                            <div className="arrow-icon"> <img src="/arrow-icon.svg" />
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                  <div className="work-item">
                    <div className="work-box d-flex flex-wrap align-items-center justify-content-between flex-md-row flex-column-reverse"
                      style={{ background: 'rgb(134 109 217 / 20%)' }}>
                      <div className="wb-img"> <img src="/project-img-4.png" alt="" /> </div>
                      <div className="wb-text">
                        <h3> WEB DESIGN </h3>
                        <h5> Snowlake Theme </h5>
                        <p> Maecenas faucibus mollis interdum sed posuere consectetur est at
                          lobortis.
                          Scelerisque id ligula porta felis euismod semper. Fusce dapibus tellus
                          cursus.
                        </p>
                        <a href="#" className="link-btn d-flex flex-wrap align-items-center">See
                          Projects <div className="arrow-icon"> <img src="/arrow-icon.svg" />
                          </div></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Banner title='Elements' logo='/logo.png'/>
      <div className="content-container bg-green">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="content-box d-flex flex-wrap">
                <div className="heading flex-wrap d-flex justify-content-between align-items-center">
                  <h3>All Elements</h3>
                  <a href="" className="btn btn-default">View All</a>
                </div>
                <BlockCard items={cards} />
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="content-container bg-green">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="video-logo-box w-100 d-flex flex-column align-items-center justify-content-center">
                <div className="video-logo">
                  <img src="/fl-logo.png" className="img-fluid" />
                </div>
                <div className="video-title mt-5">
                  <span style={{ color: '#FAB205' }}>FIRE</span>LIQUIDATOR
                </div>
                <div className="video-btn">
                  <a href="https://www.youtube.com/@fireliquidator" className="btn btn-default white">Open Youtube
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="video-content-box d-flex flex-column">
                <div className="heading d-flex">
                  <h3>Videos</h3>
                </div>

                <div className="video-card-list">
                  {videoCards.map(card => <div key={card.id} className="video-card-item">
                    <div className="video-card-box bg-yellow">
                      <div className="video-card-iframe">
                        <iframe width="560" height="315" src={card.url}
                          title="YouTube video player" frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen></iframe>
                      </div>
                      <div className="video-card-text">
                        <h5>{card.title}</h5>
                      </div>
                    </div>
                  </div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <Banner title='Elements' logo='/rc-logo.png'/>
      <div className="full-bg-container d-flex align-items-center position-relative">
        <div className="full-bg"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="full-bg-box d-flex align-items-center justify-content-center">
                <div className="full-bg-logo">
                  <img className="icon" src="/rc-logo.png " alt="" />
                </div>
                WHERE <span>IMAGINATION</span><br />MEETS <span>CREATIVITY</span>
              </div>
            </div>
          </div>
        </div>
      </div>


      <ContentContainer background='violet'>
        <Heading heading='Gallery' />
        <div className="gallery" >
          <a href="https://source.unsplash.com/_cvwXhGqG-o/600x600" data-lightbox="gallery-img" data-title="caption">
            <div className="gallery-link">
              <figure className="gallery-thumb">
                <img src="https://source.unsplash.com/_cvwXhGqG-o/300x300" alt="Portrait by Jessica Felicio" className="gallery-image" />
                <figcaption className="gallery-caption">About Image</figcaption>
              </figure>
            </div>
          </a>

          <a href="https://source.unsplash.com/AHBvAIVqk64/600x600" data-lightbox="gallery-img" data-title="caption">
            <div className="gallery-link">
              <figure className="gallery-thumb">
                <img src="https://source.unsplash.com/AHBvAIVqk64/300x500" alt="Portrait by Oladimeji Odunsi" className="gallery-image" />
                <figcaption className="gallery-caption">About Image</figcaption>
              </figure>
            </div>
          </a>

          <a href="https://source.unsplash.com/VLPLo-GtrIE/600x600" data-lightbox="gallery-img" data-title="caption">
            <div className="gallery-link">
              <figure className="gallery-thumb">
                <img src="https://source.unsplash.com/VLPLo-GtrIE/300x300" alt="Portrait by Alex Perez" className="gallery-image" />
                <figcaption className="gallery-caption">About Image</figcaption>
              </figure>
            </div>
          </a>

          <a href="https://source.unsplash.com/A9rQeI2AdR4/600x600" data-lightbox="gallery-img" data-title="caption">
            <div className="gallery-link">
              <figure className="gallery-thumb">
                <img src="https://source.unsplash.com/A9rQeI2AdR4/300x300" alt="Portrait by Hikiapp" className="gallery-image" />
                <figcaption className="gallery-caption">About Image</figcaption>
              </figure>
            </div>
          </a>

          <a href="https://source.unsplash.com/dnL6ZIpht2s/600x600" data-lightbox="gallery-img" data-title="caption">
            <div className="gallery-link">
              <figure className="gallery-thumb">
                <img src="https://source.unsplash.com/dnL6ZIpht2s/300x300" alt="Portrait by Ivana Cajina" className="gallery-image" />
                <figcaption className="gallery-caption">About Image</figcaption>
              </figure>
            </div>
          </a>

          <a href="https://source.unsplash.com/vp9mRauo68c/600x600" data-lightbox="gallery-img" data-title="caption">
            <div className="gallery-link">
              <figure className="gallery-thumb">
                <img src="https://source.unsplash.com/vp9mRauo68c/300x500" alt="Portrait by Jeffery Erhunse" className="gallery-image" />
                <figcaption className="gallery-caption">About Image</figcaption>
              </figure>
            </div>
          </a>

          <a href="https://source.unsplash.com/Xm9-vA_bhm0/600x600" data-lightbox="gallery-img" data-title="caption">
            <div className="gallery-link">
              <figure className="gallery-thumb">
                <img src="https://source.unsplash.com/Xm9-vA_bhm0/300x500" alt="Portrait by Mari Lezhava" className="gallery-image" />
                <figcaption className="gallery-caption">About Image</figcaption>
              </figure>
            </div>
          </a>

          <a href="https://source.unsplash.com/NTjSR3zYpsY/600x600" data-lightbox="gallery-img" data-title="caption">
            <div className="gallery-link">
              <figure className="gallery-thumb">
                <img src="https://source.unsplash.com/NTjSR3zYpsY/300x300" alt="Portrait by Ethan Haddox" className="gallery-image" />
                <figcaption className="gallery-caption">About Image</figcaption>
              </figure>
            </div>
          </a>

          <a href="https://source.unsplash.com/2JH8d3ChNec/600x600" data-lightbox="gallery-img" data-title="caption">
            <div className="gallery-link">
              <figure className="gallery-thumb">
                <img src="https://source.unsplash.com/2JH8d3ChNec/300x300" alt="Portrait by Amir Geshani" className="gallery-image" />
                <figcaption className="gallery-caption">About Image</figcaption>
              </figure>
            </div>
          </a>

          <a href="https://source.unsplash.com/sh3LSNbyj7k/600x600" data-lightbox="gallery-img" data-title="caption">
            <div className="gallery-link">
              <figure className="gallery-thumb">
                <img src="https://source.unsplash.com/sh3LSNbyj7k/300x300" alt="Portrait by Tyler Nix" className="gallery-image" />
                <figcaption className="gallery-caption">About Image</figcaption>
              </figure>
            </div>
          </a>

          <a href="https://source.unsplash.com/OQd9zONSx7s/600x600" data-lightbox="gallery-img" data-title="caption">
            <div className="gallery-link">
              <figure className="gallery-thumb">
                <img src="https://source.unsplash.com/OQd9zONSx7s/300x300" alt="Portrait by Jasmin Chew" className="gallery-image" />
                <figcaption className="gallery-caption">About Image</figcaption>
              </figure>
            </div>
          </a>

          <a href="https://source.unsplash.com/XZkEhowjx8k/600x600" data-lightbox="gallery-img" data-title="caption">
            <div className="gallery-link">
              <figure className="gallery-thumb">
                <img src="https://source.unsplash.com/XZkEhowjx8k/300x500" alt="Portrait by Dima DallAcqua" className="gallery-image" />
                <figcaption className="gallery-caption">About Image</figcaption>
              </figure>
            </div>
          </a>
          <a href="https://source.unsplash.com/XZkEhowjx8k/600x600" data-lightbox="gallery-img" data-title="caption">
            <div className="gallery-link">
              <figure className="gallery-thumb">
                <img src="https://source.unsplash.com/XZkEhowjx8k/300x500" alt="Portrait by Dima DallAcqua" className="gallery-image" />
                <figcaption className="gallery-caption">About Image</figcaption>
              </figure>
            </div>
          </a>
        </div>
      </ContentContainer>




    </>
  )
}

export default Portfolio