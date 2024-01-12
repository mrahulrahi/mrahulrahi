import './style.css'
import Banner from './components/Banner/Banner'
import BlockCard from './components/BlockCard/BlockCard'
import InnerHero from '../components/InnerHero/InnerHero'
import { IoIosArrowDroprightCircle } from "react-icons/io";
import Button from '../components/Button/Button';
import Heading from '../components/Heading/Heading';
import ContentContainer from '../components/ContentContainer/ContentContainer';
import VideoCard from '../components/VideoCard/VideoCard';

const HeroHeading = () => {
  return (<>
    My <span>Portfolio</span>
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

  const imageLinks = [{title: '3 Elements', url: 'https://lh3.googleusercontent.com/pw/ABLVV86X7Kk2y8JL4Xv2YX1B8IJCEq1pQ-hU7Z_eUDPT6AQOQFnz_Rt22KroEThSiPxANkAzabiEkpKk6eCRpsh5cxdD0P5BQ_XeHB0emxhQUupvw8nIG5MvoQ-qvRIDkEK6xzh54Y8PitUClqj-UzVglblK=w1196-h898-s-no-gm?authuser=0' },
,]

  return (
    <>
      <InnerHero heading={<HeroHeading />} >
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

      <Banner logo='/logo.png' >
        Elements
      </Banner>
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

      <Banner >
        WHERE <span>IMAGINATION</span><br />MEETS <span>CREATIVITY</span>
      </Banner>
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
                    <VideoCard item={card} />
                  </div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <Banner logo='/rc-logo.png'>
        <span>RAHI</span>CREATIONS
      </Banner>


      <ContentContainer background='violet'>
        <Heading heading='Gallery' />
     
        <div className="gallery" >
        {imageLinks.map( item =>  <a key={item} href={item.url} data-lightbox="gallery-img" data-title="caption">
            <div className="gallery-link">
              <figure className="gallery-thumb">
                <img src={item.url} alt="Portrait by Jessica Felicio" className="gallery-image" />
                <figcaption className="gallery-caption">{item.title}</figcaption>
              </figure>
            </div>
          </a> )}

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

          <a href="https://drive.google.com/drive/folders/15AeDxrSkHfDY3rtE1FcxxA-oDbRxrb4K" data-lightbox="gallery-img" data-title="caption">
            <div className="gallery-link">
              <figure className="gallery-thumb">
                <img src="https://drive.google.com/drive/folders/15AeDxrSkHfDY3rtE1FcxxA-oDbRxrb4K" alt="Portrait by Ethan Haddox" className="gallery-image" />
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