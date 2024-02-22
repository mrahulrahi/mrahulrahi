import Banner from '../components/Banner/Banner'
import InnerHero from '../components/InnerHero/InnerHero'
import { IoIosArrowDroprightCircle } from "react-icons/io";
import Button from '../components/Button';
import Heading from '../components/Heading/Heading';
import ContentContainer from '../components/ContentContainer';
import VideoCard from '../components/VideoCard/VideoCard';
import PhotoCard from '../components/PhotoCard/PhotoCard';

const HeroHeading = () => {
  return (<>
    My <span>Portfolio</span>
  </>)
}

const Portfolio = () => {
  const cards = [
  { id: 1, title: 'Calculator UI', url: '/portfolio/single-page' },
  { id: 2, title: 'Gradient BG', url: '/portfolio/single-page' },
  { id: 3, title: 'Notes App', url: '/portfolio/single-page' },
  { id: 4, title: 'Quiz Game', url: '/portfolio/single-page' },
  { id: 5, title: 'Responsive Menu', url: '/portfolio/single-page' },
  { id: 6, title: 'NFT Card', url: '/portfolio/single-page' },

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
      <InnerHero heading={<HeroHeading />} >
        <Button title='FireLiquidator' style='default' url='/about' icon={<IoIosArrowDroprightCircle />} />
        <Button title='Rahi Creations' style='default' url='/about' icon={<IoIosArrowDroprightCircle />} />
      </InnerHero>

      <ContentContainer background='gold'>
        <div className="itb-content-box bg-green">
          <Heading heading='My Project' />
          <div className="work-list d-flex flex-wrap">
            <div className="work-item">
              <div className="work-box d-flex flex-wrap align-items-center justify-content-between bg-violet">
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
            <div className="work-item">
              <div className="work-box d-flex flex-wrap align-items-center justify-content-between bg-gold">
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
            <div className="work-item">
              <div className="work-box d-flex flex-wrap align-items-center justify-content-between"
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
            <div className="work-item">
              <div className="work-box d-flex flex-wrap align-items-center justify-content-between"
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
      </ContentContainer>

      <Banner logo='/rc-logo.png'>
        <span>RAHI</span>CREATIONS
      </Banner>


      <ContentContainer background='violet'>
        <Heading heading='Gallery' />

        <div className="gallery" >
          {imageLinks.map(item =>
            <div >
              <PhotoCard item={item} />
            </div>
          )}
        </div>
      </ContentContainer >

      <Banner >
        WHERE <span>IMAGINATION</span><br />MEETS <span>CREATIVITY</span>
      </Banner>

      <ContentContainer background='green'>
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
      </ContentContainer>
    </>
  )
}

export default Portfolio