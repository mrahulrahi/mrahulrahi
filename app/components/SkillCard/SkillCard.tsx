import { JSX } from "react";
import './SkillCard.css'

interface Props {
    skill : Skill;
}

interface Skill{
    id : number;
    logo : JSX.Element;
    title : string;
}

const SkillCard = ({skill} : Props) => {
    return (
        <>
            <div className="skill-card-box w-100 h-100">
                <div className="skill-card-icon mx-auto">
                    {skill.logo}
                </div>
                <p>{skill.title}</p>
            </div>
        </>
    )
}

export default SkillCard