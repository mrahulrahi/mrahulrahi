import Banner from '../components/Banner/Banner'
import InnerHero from '../components/InnerHero/InnerHero'
import { IoIosArrowDroprightCircle } from "react-icons/io";
import Button from '../components/Button';
import Heading from '../components/Heading/Heading';
import ContentContainer from '../components/ContentContainer';
import VideoCard from '../components/VideoCard/VideoCard';
import PhotoCard from '../components/PhotoCard/PhotoCard';
import WorkCard from '../components/WorkCard/WorkCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'mrahulrahi - portfolio',
  description: 'portfolio work',
}

const HeroHeading = () => {
  return (<>
    My <span>Portfolio</span>
  </>)
}

const Portfolio = () => {
  const WorkCards = [
    { id: 1, label: 'Portfolio', title: 'mrahulrahi', para: "The project is a personal portfolio website for front-end developer Rahul Maurya, built with Next.js. It features a modern and responsive design, showcasing various projects, skills, and tools. The site emphasizes user engagement through interactive elements and animations, providing a comprehensive overview of the developer's expertise and work.", url: 'https://mrahulrahi.vercel.app/', imgUrl: '/project-img-1.png' },
    { id: 2, label: 'Business', title: 'Imagine Group', para: 'Maecenas faucibus mollis interdum sed posuere consectetur est at lobortis. Scelerisque id ligula porta felis euismod semper. Fusce dapibus tellus cursus.', url: 'http://imaginegindia.com', imgUrl: '/project-img-2.png' },
    { id: 3, label: 'App', title: 'Soul Sync', para: 'Maecenas faucibus mollis interdum sed posuere consectetur est at lobortis. Scelerisque id ligula porta felis euismod semper. Fusce dapibus tellus cursus.', url: 'https://soulsyncapp.vercel.app', imgUrl: '/project-img-3.png' },
    { id: 4, label: 'Tools', title: 'Weather App', para: 'The Weather App is a React application that provides real-time weather updates and forecasts for cities, allowing users to input a city name to retrieve current conditions and a seven-day forecast. It features a visually appealing design and interactive elements for an engaging user experience.', url: '/tools/weather-app', imgUrl: '/project-img-4.png' },
    { id: 7, label: 'Web Design', title: 'Notes App', para: 'The Notes App is a React-based application that allows users to create, update, and delete notes and to-do lists. It features a user-friendly interface for managing tasks and notes, with functionality to save data locally in the browser. The app supports adding tasks to to-do lists and provides a visually appealing design for an enhanced user experience.', url: '/tools/notes-app', imgUrl: '/project-img-5.png' },
    { id: 8, label: 'Web Design', title: 'Quiz Game', para: 'The Quiz Game is a React application that allows users to test their knowledge through a series of trivia questions. Users can select the number of questions, category, difficulty, and type before starting the quiz, which fetches questions from the Open Trivia Database API. The app features a user-friendly interface for answering questions and provides immediate feedback on performance.', url: '/tools/quiz-game', imgUrl: '/project-img-6.png' },
    { id: 5, label: 'Tools', title: 'Calculator', para: 'The Calculator is a React application that allows users to perform basic arithmetic operations and advanced calculations using a user-friendly interface. It features buttons for various operations, including addition, subtraction, multiplication, and division, along with functionalities for evaluating expressions and handling errors.', url: '/tools/calculator', imgUrl: '/project-img-7.png' },
    { id: 6, label: 'Web Design', title: 'Gradient BG', para: 'The Gradient Background Generator is a React application that allows users to create custom linear gradient backgrounds by selecting two colors. It provides a live preview of the gradient and displays the corresponding CSS code for easy use.', url: '/tools/gradient-bg', imgUrl: '/project-img-8.png' },
    { id: 9, label: 'Web Design', title: 'Quote Generator', para: 'The Quote Generator is a React application that fetches random quotes from an API and displays them with options to share on social media. It features a dynamic background color that changes with each new quote, enhancing the user experience.', url: '/tools/quote-generator', imgUrl: '/project-img-9.png' },


  ]

  const videoCards = [{ id: 1, title: 'OnePlus 8 | B-roll | Cinematic Shots', url: 'https://www.youtube.com/embed/O3zRzznPFA4' },
  { id: 2, title: 'OnePlus NORD | B-roll | Cinematic Shots', url: 'https://www.youtube.com/embed/KVPr-Q-cloY' },
  { id: 3, title: 'Xiaomi Mi 10i | B-roll | Cinematic Shots', url: 'https://www.youtube.com/embed/vNFb5rk77Pg' },
  { id: 4, title: 'OnePlus NORD Vs OnePlus 8 | Camera Comparison', url: 'https://www.youtube.com/embed/1fiuAE0bRDY' },
  { id: 5, title: '5 OnePlus Benefits | Red Cable Club Membership', url: 'https://www.youtube.com/embed/Kb-tjX9orj0' },
  { id: 5, title: 'Cinematic B-roll | OnePlus Bullets Wireless Z', url: 'https://www.youtube.com/embed/4OHGr67Xiag' },
  { id: 5, title: 'Cinematic B-roll | Asus ROG Strix G15 531GT', url: 'https://www.youtube.com/embed/tb1pmAbIlKg' },
  { id: 5, title: 'Apps Review | YMUSIC | Fire Liquidator', url: 'https://www.youtube.com/embed/xnavnMUQjkE' },]

  const imageLinks = [
    { title: '3 Elements', url: 'https://lh3.googleusercontent.com/pw/ABLVV85b8dsm6nMR88Cw4W6-0VK8NBWdQxAb0SmvAOQOmsj0YfYZYBUEuSH6Bm4qukN-u-yDAy5XJUa5WHKuL83-PZkMgPSCTHGFP_m7I9gsuFNienHiXrbFy8IGsiqJhjNR9jJ-bzaIPybieqr8MP9201KB=w1196-h898-s-no-gm?authuser=0' },
    { title: '', url: 'https://lh3.googleusercontent.com/pw/ABLVV87m-b71QsQeBDAWjrpHSLAjOKWq1J7t-2nDRcq_0H3yspuZV-le_2wQRCmJH-veL7MBG0wPKE2XTpeqafQVGlDP9Pht-10wHOC7rsctCtmzcQQeGvmhRwFT_8D6-tVjyEPKSkrN3nL9ljGOQ_bYJgFP_nintxU3csc5wKCCasTOaj0CnF6lHqFlYcUszv7nMs1Q1hi7G8lzfcKTh9kIRciArb-2CMy-j5an3uT1n6ctlipzQZMXxjug5f48hIIF5kfUbd_xC_0XxjfhfYPkUpBSkKhI6GaEjcc-Kng131H_QD9LWOlhvl30KVlLuYl5DGqZApaEC2KlMgUuhv_wgK02qF9r_KrSmeThnAv9leBzRik9FBNQw5xRxBGxTXwf6kd8UJIxoB8e-NRfpaMmynXqElG7kBzwSamNh1wR7DMEJ8sh6s8Rov--9id-av85qEDYFVzCYmVaem_ewA8GqPVkvTMdtfxTSeowGbqwDcNWbY9CT0NS3_O2p4IYLYmYD09ak108wrYvdB-41XrL4_bWVQ9aDnk1zO3sUT-NINXPHwuesIkOULtmVkbzNPSp_StpGMmcVEJnVWKsBul4dXK68Y4VGrzMjZQ1mHCNvibk_2yaqZkOWB7PurHgLwL6XzBpFUVw-5SjloRvm370HH8FEnV2VT8kfZSsE43Wv_zVHzjWXJRVYx_30n2JOXkdTaa8sg4CAUtaqgGzrmTOhfefcxfSx3cp7BWGk0mS-4L5izWnMBWjnRETzbpXFh_avJqxNXRsv7iZIgqlHUwpBPukilkPcmgDJ7iWnyLowe1x89F1kP7LFgGGzzm8YY0BsAtXyJE0dBQGFf43pvN_jbT0mjSB_QeohfJLV62DRwQ6Nw_KHZP3yMnoKVHtQB-9sZqkQIsskx7evPPndVWqwkWKUQ8iON3tMxsBdS9vSEKTHk2TdlFRso5h-2rc5ukQotevcCFAh6ibrazz0xI5-aOktmhsihLcKOUYxCHi2GNbUSA439RpNx8uESJhq7lMHhPLk9Yp_hCGmEqj1ofVGXSBAC62zWSUcDg7GzQ5GmF3P6o54sddGg=w674-h898-s-no-gm?authuser=0' },
    { title: '', url: 'https://lh3.googleusercontent.com/pw/ABLVV86TumQujzkj4fJ8-38Nu5lxnoLi1ot3gWetNGHNNKdbpk71cyBO4RNiy9-EtgT2YkTPU0rDKaXuDl0u3szuGlZdkLTBFRvodkLt-XOKxoskeqpxz068Adz0HN3BS7lhflDu4IDXw2r9HN68p461ndnx=w1196-h898-s-no-gm?authuser=0' },
    { title: '', url: 'https://lh3.googleusercontent.com/pw/ABLVV85mIKuId31W5PvYJe4TipmOrmYo2234Z90cS4w2SCc3Vyn-z2nXkPp0pX2uDLob06TNCxWDDJQzZa9-k7UfPSt3X52qmm2ylG_HeWwWaS1M__GUS4E4zhwIYuhVL80XsCjV5HtpJK0-M9nviYvY8WL2=w1348-h898-s-no-gm?authuser=0' },
    { title: '', url: 'https://lh3.googleusercontent.com/pw/ABLVV86BkvPqD8HnZ2Ls3ud3Yi3r4E_bgkjrYW3s_qnv-RnOxZALZN4Qppup819MtYW54zqqJWw-BwA5Jgnsgf7EtzXZGhoBd3xJOdTvVasnlMzQiKRib1sSIMaKz-6nREmpLlyES1ovk_QhIFJ9vfsUxIs4=w1196-h898-s-no-gm?authuser=0' },
    { title: '', url: 'https://lh3.googleusercontent.com/pw/ABLVV86pHiqcoKYpRQEo8nbzL9NAjDsoSR8qygyNTVL9f9ADakxgtGSzr8LV-184dDbt-A-NQrIGN6T1Xzx9sdaL53tWJmB-FoTxWoo4lmY8CQ1pFRil4VFkOwgafIwkdJnRVbDcP-vzNc1paiRQXRvOFzte=w674-h898-s-no-gm?authuser=0' },
    { title: '', url: 'https://lh3.googleusercontent.com/pw/ABLVV85p6KiTwrSlTnEpsc_rN8JVlmaRhL5JQiqtBmt_fxrUe3QZl1dSLZOMrTvqnzp90SAgQmQF5JcSt1vsP2O_djREVxyIctl0z-nFkWgf7QllhX0OH-EA5hOZS8P9sc73os_3p3cNO2ZUBJhDhdcFHRtD=w674-h898-s-no-gm?authuser=0' },
    { title: '', url: 'https://lh3.googleusercontent.com/pw/ABLVV84IgMgixUqh43a8NkRQfPNSdxwO7h-l9Ta9QquNu0QGbIaS68CySEvNGHMfPfQnYmjXA4QkryYl1wBF5uiEJH-6VxsMEsXwhDrNRxx6ksDvKsuf4endNn767WzHGLFFdB7piNGygs8gf2NyzMpWA8tx=w505-h898-s-no-gm?authuser=0' },
    { title: '', url: 'https://lh3.googleusercontent.com/pw/ABLVV85FZmC3vKPWy-XNj0XBfH03lueRYp50XifNJ07asn7tTCyyjYlBkXvAIxj4yFq51Jk1JYhxF73Kf552gho3pvcRg2WScvol5vDDggIzVGiUSczTIUiK5SLFv4wM3FlfHr3JJOqfMTq2tlhwOv4ja82J=w674-h898-s-no-gm?authuser=0' },
    { title: '', url: 'https://lh3.googleusercontent.com/pw/ABLVV87O6db7fR9QeWciN6Xf0f82jIYZivOr9znLo7maAmY7j3J81MtBiAPkXkZbjqrrD1SrbhlHd_co26bvrxuVvJ9a1jrHKJurucOwX-RJ1aBxNCtH2l8EeXb-wx7LyrZXLC3BbK_quKyz5OCqpZ6RAE1q=w674-h898-s-no-gm?authuser=0' },
    { title: '', url: 'https://lh3.googleusercontent.com/pw/ABLVV86oGswt18u0F_pXSMaXWOoS1O278s0P_7Tkq6-Wik5j1AR_be-7SUxLAFWZUCweEYnz70VDjgZtn7WqIo61-PvV3ODmawR_e5gvpiIGvN5JwpA0chijeHNIlNrolBW3hGV9u1waYCdjQyn0-IyR1Hdd=w1196-h898-s-no-gm?authuser=0' },
  ]

  return (
    <>
      <InnerHero heading={<HeroHeading />} bgImage='/inner-hero-img.jpg' >
        <Button title='FireLiquidator' style='default' url='#video' icon={<IoIosArrowDroprightCircle />} />
        <Button title='Rahi Creations' style='default' url='#gallery' icon={<IoIosArrowDroprightCircle />} />
      </InnerHero>

      <ContentContainer background='yellow'>
        <div className="itb-content-box bg-green" data-aos="fade-up">
          <Heading heading='My Project' />

          <div className="work-list d-flex flex-wrap">
            {WorkCards.map(card =>
              <div key={card.id} className="work-item" data-aos="fade-up">
                <WorkCard card={card} />
              </div>
            )}
          </div>
        </div>
      </ContentContainer>

      <Banner logo='./rc-logo.png' bgImage='./banner-bg.jpg'>
        <span>RAHI</span>CREATIONS
      </Banner>


      <ContentContainer background='violet' id='gallery'>
        <Heading heading='Gallery' />

        <div className="gallery" data-aos="fade-up">
          {imageLinks.map(item =>
            <div>
              <PhotoCard item={item} />
            </div>
          )}
        </div>
      </ContentContainer >

      <Banner bgImage='./banner-bg.jpg'>
        WHERE <span>IMAGINATION</span><br />MEETS <span>CREATIVITY</span>
      </Banner>

      <ContentContainer background='green' id='video'>
        <div className="row">
          <div className="col-md-5 col-xl-4">
            <div className="sticky-sidebar-box w-100 d-flex flex-column align-items-center justify-content-center" data-aos="fade-up">
              <div className="video-logo" data-aos="fade-up">
                <img src="/fl-logo.png" className="img-fluid" />
              </div>
              <div className="video-title mt-5" data-aos="fade-up">
                <span style={{ color: '#FAB205' }}>FIRE</span>LIQUIDATOR
              </div>
              <div className="video-btn" data-aos="fade-up">
                <a href="https://www.youtube.com/@fireliquidator" className="btn btn-default white">Open Youtube
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-7 col-xl-8">
            <div className="sticky-content-box d-flex flex-column" data-aos="fade-up">
              <div className="heading d-flex">
                <h3>Videos</h3>
              </div>

              <div className="video-card-list" data-aos="fade-up">
                {videoCards.map(card => <div key={card.id} className="video-card-item" data-aos="fade-up">
                  <VideoCard item={card} />
                </div>)}
              </div>
            </div>
          </div>
        </div>
      </ContentContainer>
    </>
  )
}

export default Portfolio