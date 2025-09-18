import './ProjectCard.css'
import { FaGlobe, FaGithub } from "react-icons/fa";
import * as RiIcons from "react-icons/ri";

interface Props {
    card: Item;
}

interface Item {
    id: number;
    imgUrl: string;
    title: string;
    para: string;
    gitHubUrl: string;
    liveUrl: string;
    technologies?: string[];
}

const ProjectCard = ({ card }: Props) => {
    const IconOneComponent = card.technologies && card.technologies[0]
        ? RiIcons[card.technologies[0] as keyof typeof RiIcons]
        : null;
    const IconTwoComponent = card.technologies && card.technologies[1]
        ? RiIcons[card.technologies[1] as keyof typeof RiIcons]
        : null;
    const IconThreeComponent = card.technologies && card.technologies[2]
        ? RiIcons[card.technologies[2] as keyof typeof RiIcons]
        : null;
    const IconFourComponent = card.technologies && card.technologies[3]
        ? RiIcons[card.technologies[3] as keyof typeof RiIcons]
        : null;


    return (

        <div className="projects-card-box w-100 h-100">
            <div className="projects-card-img-box">
                <div className="projects-card-img">
                    <img src={card.imgUrl} alt="" />
                </div>
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
                <p className="mt-auto">{card.para}</p>
                <div className="tools d-flex justify-content-between align-items-center">
                    <h5>Tools used</h5>
                    <div className="badge-list d-flex">
                        {IconOneComponent && <div className="badge-item text-accent"><IconOneComponent /></div>}
                        {IconTwoComponent && <div className="badge-item text-accent"><IconTwoComponent /></div>}
                        {IconThreeComponent && <div className="badge-item text-accent"><IconThreeComponent /></div>}
                        {IconFourComponent && <div className="badge-item text-accent"><IconFourComponent /></div>}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProjectCard