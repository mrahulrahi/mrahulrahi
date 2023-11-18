import Image from 'next/image'



export default function Home() {
  const skills = [{
    id: 1,
    logo: 'fa-brands fa-html5',
    title: 'HTML'
  },
  {
    id: 2,
    logo: 'fa-brands fa-css3-alt',
    title: 'CSS'
  }, {
    id: 3,
    logo: 'fa-brands fa-square-js',
    title: 'JavaScript'
  }, {
    id: 4,
    logo: 'fa-brands fa-bootstrap',
    title: 'Bootstrap'
  }, {
    id: 5,
    logo: 'fa-brands fa-react',
    title: 'ReactJS'
  }, {
    id: 6,
    logo: 'fa-brands fa-node-js',
    title: 'Node.js'
  },{
    id: 7,
    logo: 'fa-brands fa-git-alt',
    title: 'Git'
  },{
    id: 8,
    logo: 'fa-brands fa-github',
    title: 'GitHub'
  },{
    id: 9,
    logo: 'fa-brands fa-figma',
    title: 'Figma'
  }]

  return (
    <main >

      <div className="hero-container d-flex align-items-start position-relative">
        <div className="hero-bg"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="hero-box d-flex align-items-center justify-content-center">
                <div className="hero-text text-center">
                  <h4><span>Hello,</span> I'm</h4>
                  <h1>Rahul <span>Maurya</span></h1>
                  <h3>I'm a <span>Web Developer</span>.</h3>
                  <div className="hero-btn">
                    <a href="#projects" className="btn btn-default">Featured Work
                      <i className="fas fa-arrow-down ms-2"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="content-container image-text-block-container bg-yellow">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="itb-content-box d-flex flex-wrap bg-violet">
                <div className="itb-img-box d-flex align-items-center justify-content-center">
                  <div className="itb-img">
                    <Image src="/main-img.jpg" alt="" width={100} height={100} />
                  </div>
                </div>
                <div className="itb-text">
                  <div className="heading d-flex">
                    <h3>About Me</h3>
                  </div>
                  <h2>Rahul <span>Maurya</span></h2>
                  <h5>Web <span>Developer</span></h5>
                  <p>I am a front-end web developer whose life's passion is Technology and I also love to
                    click photographs. I can provide clean code and pixel perfect design. I also make the
                    website responsive & more interactive with web animations. I try to make videos that are
                    to-the-point and as content-packed as possible, so if that sounds like your cup of tea,
                    a sub would be massively appreciated! 🙏</p>
                  <p>Stack - MERN Stack</p>

                  <a href="https://drive.google.com/file/d/1-4vdQtKGmM2ixaMvL2Wav6KY9ncrglcT/view?usp=sharing"
                    className="btn btn-default white">Download Resume</a>
                </div>

              </div>

              <div className="itb-skill-box d-flex flex-column bg-violet">
                <div className="heading d-flex">
                  <h3>Skills</h3>
                </div>

                <div className="skill-card-list d-flex flex-wrap">
                  {skills.map(skill => <div key={skill.id} className="skill-card-item">
                    <div className="skill-card-box">
                      <div className="skill-card-icon mx-auto">
                        <i className={skill.logo}></i>
                      </div>
                      <p>{skill.title}</p>
                    </div>
                  </div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main >
  )
}
