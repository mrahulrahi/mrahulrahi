import Banner from '../components/Banner/Banner'
import InnerHero from '../components/InnerHero/InnerHero'
import { IoIosArrowDroprightCircle } from "react-icons/io";
import Button from '../components/Button';
import Heading from '../components/Heading';
import ContentContainer from '../components/ContentContainer';
import VideoCard from '../components/VideoCard/VideoCard';
import PhotoCard from '../components/PhotoCard/PhotoCard';
import WorkCard from '../components/WorkCard/WorkCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'mrahulrahi - portfolio',
  description: 'portfolio work',
}

type Video = {
  id: { videoId: string };
  snippet: { title: string; description: string; thumbnails: { medium: { url: string } } };
};

const HeroHeading = () => {
  return (<>
    My <span className="bg-clip-text bg-gradient-1">Portfolio</span>
  </>)
}

const Portfolio = async () => {
  const WorkCards = [
    { id: 1, label: 'Portfolio', title: 'mrahulrahi', para: "The project is a personal portfolio website for front-end developer Rahul Maurya, built with Next.js. It features a modern and responsive design, showcasing various projects, skills, and tools. The site emphasizes user engagement through interactive elements and animations, providing a comprehensive overview of the developer's expertise and work.", url: 'https://mrahulrahi.vercel.app/', imgUrl: '/project-img-1.png' },
    { id: 2, label: 'Business', title: 'NTS', para: "The project is a personal portfolio website for front-end developer Rahul Maurya, built with Next.js. It features a modern and responsive design, showcasing various projects, skills, and tools. The site emphasizes user engagement through interactive elements and animations, providing a comprehensive overview of the developer's expertise and work.", url: 'https://mrahulrahi.vercel.app/', imgUrl: '/project-img-2.png' },
    { id: 3, label: 'Business', title: 'Imagine Group', para: "Welcome to Imagine Group, where your property dreams become reality. Our team of experienced professionals offers personalized service and innovative solutions to make your real estate journey seamless. Discover a world of possibilities with Imagine Group.", url: 'http://imaginegindia.com', imgUrl: '/project-img-3.png' },
    { id: 4, label: 'App', title: 'Soul Sync', para: 'Maecenas faucibus mollis interdum sed posuere consectetur est at lobortis. Scelerisque id ligula porta felis euismod semper. Fusce dapibus tellus cursus.', url: 'https://soulsyncapp.vercel.app', imgUrl: '/project-img-4.png' },
    { id: 5, label: 'Tools', title: 'Weather App', para: 'The Weather App is a React application that provides real-time weather updates and forecasts for cities, allowing users to input a city name to retrieve current conditions and a seven-day forecast. It features a visually appealing design and interactive elements for an engaging user experience.', url: '/tools/weather-app', imgUrl: '/project-img-5.png' },
    { id: 6, label: 'Web Design', title: 'Notes App', para: 'The Notes App is a React-based application that allows users to create, update, and delete notes and to-do lists. It features a user-friendly interface for managing tasks and notes, with functionality to save data locally in the browser. The app supports adding tasks to to-do lists and provides a visually appealing design for an enhanced user experience.', url: '/tools/notes-app', imgUrl: '/project-img-6.png' },
    { id: 7, label: 'Web Design', title: 'Quiz Game', para: 'The Quiz Game is a React application that allows users to test their knowledge through a series of trivia questions. Users can select the number of questions, category, difficulty, and type before starting the quiz, which fetches questions from the Open Trivia Database API. The app features a user-friendly interface for answering questions and provides immediate feedback on performance.', url: '/tools/quiz-game', imgUrl: '/project-img-7.png' },
    { id: 8, label: 'Tools', title: 'Calculator', para: 'The Calculator is a React application that allows users to perform basic arithmetic operations and advanced calculations using a user-friendly interface. It features buttons for various operations, including addition, subtraction, multiplication, and division, along with functionalities for evaluating expressions and handling errors.', url: '/tools/calculator', imgUrl: '/project-img-8.png' },
    { id: 9, label: 'Web Design', title: 'Gradient BG', para: 'The Gradient Background Generator is a React application that allows users to create custom linear gradient backgrounds by selecting two colors. It provides a live preview of the gradient and displays the corresponding CSS code for easy use.', url: '/tools/gradient-bg', imgUrl: '/project-img-9.png' },
    { id: 10, label: 'Web Design', title: 'Quote Generator', para: 'The Quote Generator is a React application that fetches random quotes from an API and displays them with options to share on social media. It features a dynamic background color that changes with each new quote, enhancing the user experience.', url: '/tools/quote-generator', imgUrl: '/project-img-10.png' },


  ]

  const imageLinks = [
    { id: 1,  title: '3 Elements', url: 'https://lh3.googleusercontent.com/pw/ABLVV85b8dsm6nMR88Cw4W6-0VK8NBWdQxAb0SmvAOQOmsj0YfYZYBUEuSH6Bm4qukN-u-yDAy5XJUa5WHKuL83-PZkMgPSCTHGFP_m7I9gsuFNienHiXrbFy8IGsiqJhjNR9jJ-bzaIPybieqr8MP9201KB=w1196-h898-s-no-gm?authuser=0' },
    { id: 2,  title: 'Camellia', url: 'https://lh3.googleusercontent.com/pw/ABLVV86TumQujzkj4fJ8-38Nu5lxnoLi1ot3gWetNGHNNKdbpk71cyBO4RNiy9-EtgT2YkTPU0rDKaXuDl0u3szuGlZdkLTBFRvodkLt-XOKxoskeqpxz068Adz0HN3BS7lhflDu4IDXw2r9HN68p461ndnx=w1196-h898-s-no-gm?authuser=0' },
    { id: 3,  title: 'Watertank Sunset', url: 'https://lh3.googleusercontent.com/pw/ABLVV85mIKuId31W5PvYJe4TipmOrmYo2234Z90cS4w2SCc3Vyn-z2nXkPp0pX2uDLob06TNCxWDDJQzZa9-k7UfPSt3X52qmm2ylG_HeWwWaS1M__GUS4E4zhwIYuhVL80XsCjV5HtpJK0-M9nviYvY8WL2=w1348-h898-s-no-gm?authuser=0' },
    { id: 4,  title: 'Diya', url: 'https://lh3.googleusercontent.com/pw/ABLVV86BkvPqD8HnZ2Ls3ud3Yi3r4E_bgkjrYW3s_qnv-RnOxZALZN4Qppup819MtYW54zqqJWw-BwA5Jgnsgf7EtzXZGhoBd3xJOdTvVasnlMzQiKRib1sSIMaKz-6nREmpLlyES1ovk_QhIFJ9vfsUxIs4=w1196-h898-s-no-gm?authuser=0' },
    { id: 5,  title: 'Sulfur Cosmos', url: 'https://lh3.googleusercontent.com/pw/ABLVV86pHiqcoKYpRQEo8nbzL9NAjDsoSR8qygyNTVL9f9ADakxgtGSzr8LV-184dDbt-A-NQrIGN6T1Xzx9sdaL53tWJmB-FoTxWoo4lmY8CQ1pFRil4VFkOwgafIwkdJnRVbDcP-vzNc1paiRQXRvOFzte=w674-h898-s-no-gm?authuser=0' },
    { id: 6,  title: 'Dark Flower', url: 'https://lh3.googleusercontent.com/pw/ABLVV85p6KiTwrSlTnEpsc_rN8JVlmaRhL5JQiqtBmt_fxrUe3QZl1dSLZOMrTvqnzp90SAgQmQF5JcSt1vsP2O_djREVxyIctl0z-nFkWgf7QllhX0OH-EA5hOZS8P9sc73os_3p3cNO2ZUBJhDhdcFHRtD=w674-h898-s-no-gm?authuser=0' },
    { id: 7,  title: 'Red Flower', url: 'https://lh3.googleusercontent.com/pw/ABLVV84IgMgixUqh43a8NkRQfPNSdxwO7h-l9Ta9QquNu0QGbIaS68CySEvNGHMfPfQnYmjXA4QkryYl1wBF5uiEJH-6VxsMEsXwhDrNRxx6ksDvKsuf4endNn767WzHGLFFdB7piNGygs8gf2NyzMpWA8tx=w505-h898-s-no-gm?authuser=0' },
    { id: 8,  title: 'Drops on Rose Leaf', url: 'https://lh3.googleusercontent.com/pw/ABLVV85FZmC3vKPWy-XNj0XBfH03lueRYp50XifNJ07asn7tTCyyjYlBkXvAIxj4yFq51Jk1JYhxF73Kf552gho3pvcRg2WScvol5vDDggIzVGiUSczTIUiK5SLFv4wM3FlfHr3JJOqfMTq2tlhwOv4ja82J=w674-h898-s-no-gm?authuser=0' },
    { id: 9,  title: 'Water Drops on Leaf', url: 'https://lh3.googleusercontent.com/pw/ABLVV87O6db7fR9QeWciN6Xf0f82jIYZivOr9znLo7maAmY7j3J81MtBiAPkXkZbjqrrD1SrbhlHd_co26bvrxuVvJ9a1jrHKJurucOwX-RJ1aBxNCtH2l8EeXb-wx7LyrZXLC3BbK_quKyz5OCqpZ6RAE1q=w674-h898-s-no-gm?authuser=0' },
    { id: 10,  title: 'Drops on Dark Leaf', url: 'https://lh3.googleusercontent.com/pw/ABLVV86oGswt18u0F_pXSMaXWOoS1O278s0P_7Tkq6-Wik5j1AR_be-7SUxLAFWZUCweEYnz70VDjgZtn7WqIo61-PvV3ODmawR_e5gvpiIGvN5JwpA0chijeHNIlNrolBW3hGV9u1waYCdjQyn0-IyR1Hdd=w1196-h898-s-no-gm?authuser=0' },
  ]

  const { YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID } = process.env;

  const res = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${YOUTUBE_CHANNEL_ID}&part=snippet&type=video&maxResults=15`, {
    cache: "no-store", // Disable caching for dynamic data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch YouTube videos");
  }

  const data = await res.json();
  const videos: Video[] = data.items || [];

  return (
    <>
      <InnerHero heading={<HeroHeading />} bgImage='/inner-hero-img.jpg' >
        <Button title='FireLiquidator' style='default' url='#video' icon={<IoIosArrowDroprightCircle />} />
        <Button title='Rahi Creations' style='default' url='#gallery' icon={<IoIosArrowDroprightCircle />} />
      </InnerHero>

      <ContentContainer background='gradient-2'>
        <div className="itb-content-box bg-gradient-1" data-aos="fade-up" suppressHydrationWarning>
          <Heading heading='My Project' />

          <div className="work-list d-flex flex-wrap">
            {WorkCards.map(card =>
              <div key={card.id} className="work-item" data-aos="fade-up" suppressHydrationWarning>
                <WorkCard card={card} />
              </div>
            )}
          </div>
        </div>
      </ContentContainer>

      <Banner logo='./rc-logo.png' bgImage='./banner-bg.jpg'>
        <span className='bg-clip-text bg-gradient-1'>RAHI</span>CREATIONS
      </Banner>


      <ContentContainer background='dark' id='gallery'>
        <Heading heading='Gallery' />

        <div className="gallery" data-aos="fade-up" suppressHydrationWarning>
          {imageLinks.map(item =>
            <div key={item.id}>
              <PhotoCard item={item} />
            </div>
          )}
        </div>
      </ContentContainer >

      <Banner bgImage='./banner-bg.jpg'>
        WHERE <span className='bg-clip-text bg-gradient-1'>IMAGINATION</span><br />MEETS <span className='bg-clip-text bg-gradient-1'>CREATIVITY</span>
      </Banner>

      <ContentContainer background='gradient-2' id='video'>
        <div className="row">
          <div className="col-md-5 col-xl-4">
            <div className="sticky-sidebar-box w-100 d-flex flex-column align-items-center justify-content-center" data-aos="fade-up" suppressHydrationWarning>
              <div className="video-logo" data-aos="fade-up" suppressHydrationWarning>
                <img src="/fl-logo.png" className="img-fluid" />
              </div>
              <div className="video-title mt-5" data-aos="fade-up" suppressHydrationWarning>
                <span style={{ color: '#FAB205' }}>FIRE</span>LIQUIDATOR
              </div>
              <div className="video-btn" data-aos="fade-up" suppressHydrationWarning>
                <Button title='Open Youtube' style='default' url='https://www.youtube.com/@fireliquidator' />
              </div>
            </div>
          </div>
          <div className="col-md-7 col-xl-8">
            <div className="sticky-content-box d-flex flex-column" data-aos="fade-up" suppressHydrationWarning>
              <Heading heading='Videos' />

              <div className="video-card-list" data-aos="fade-up" suppressHydrationWarning>
                {videos.map(video => <div key={video.id.videoId} className="video-card-item" data-aos="fade-up" suppressHydrationWarning>
                  <VideoCard id={video.id.videoId} title={video.snippet.title} />
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