import './ProjectCard.css'
import { RiHtml5Fill, RiJavascriptFill, RiBootstrapFill } from "react-icons/ri";
import { FaCss3Alt, FaGlobe, FaGithub } from "react-icons/fa";

interface Props {
    card: Item;
}

interface Item {
    id: number;
    imgUrl: string;
    title: string;
    gitHubUrl: string;
    liveUrl: string;
}

const ProjectCard = ({ card }: Props) => {


    return (

        <div className="projects-card-box w-100 h-100">
            <div className="projects-card-img">
                <img src={card.imgUrl} alt="" />
            </div>

            <div className="projects-card-text-box">
                <div
                    className="projects-card-text d-flex justify-content-between align-items-center gap-2">
                    <h4>{card.title}</h4>
                    <div className="d-flex">
                        <a className="icon-link-btn d-flex align-items-center justify-content-center rounded-circle"
                            href={card.liveUrl}><FaGlobe /></a>
                        <a className="icon-link-btn d-flex align-items-center justify-content-center rounded-circle"
                            href={card.gitHubUrl}><FaGithub /></a>
                    </div>
                </div>
                <div className="tools d-flex justify-content-between align-items-center">
                    <h5>Tools used</h5>
                    <div className="badge-list d-flex">
                        <div className="badge-item text-accent">
                            <RiHtml5Fill />
                        </div>
                        <div className="badge-item text-accent">
                            <FaCss3Alt />
                        </div>
                        <div className="badge-item text-accent">
                            <RiJavascriptFill />
                        </div>
                        <div className="badge-item text-accent">
                            <RiBootstrapFill />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProjectCard