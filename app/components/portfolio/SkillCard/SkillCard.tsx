import './SkillCard.css';
import { JSX } from "react";
import { renderIcon } from '@/app/components/portfolio/icons';

interface Props {
    skill : Skill;
}

interface Skill {
    id : number;
    logo ?: JSX.Element | string;
    icon ?: string;
    title : string;
}

const SkillCard = ({skill} : Props) => {
    const iconName = skill.icon || (typeof skill.logo === 'string' ? skill.logo : undefined);
    const renderedLogo = typeof skill.logo === 'object' ? skill.logo : renderIcon(iconName);

    return (
        <>
            <div className="skill-card-box w-100 h-100">
                <div className="skill-card-icon mx-auto" aria-hidden="true">
                    {renderedLogo}
                </div>
                <p>{skill.title}</p>
            </div>
        </>
    )
}

export default SkillCard