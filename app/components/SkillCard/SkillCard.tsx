import * as FaIcons from "react-icons/fa6";
import * as FaIconsReg from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as LuIcons from "react-icons/lu";
import './SkillCard.css';
import * as BiIcons from "react-icons/bi";
import * as TbIcons from "react-icons/tb";
import * as SiIcons from "react-icons/si";
import { JSX } from "react";

const iconPacks: Record<string, any> = {
    ...FaIcons,
    ...FaIconsReg,
    ...MdIcons,
    ...LuIcons,
    ...BiIcons,
    ...TbIcons,
    ...SiIcons,
};

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
    const skillIcon = skill.icon || (typeof skill.logo === 'string' ? skill.logo : null);
    let renderedLogo = typeof skill.logo === 'string' ? null : skill.logo;

    if (skillIcon) {
        const IconComponent = iconPacks[skillIcon];
        if (IconComponent) {
            renderedLogo = <IconComponent />;
        }
    }

    return (
        <>
            <div className="skill-card-box w-100 h-100">
                <div className="skill-card-icon mx-auto">
                    {renderedLogo}
                </div>
                <p>{skill.title}</p>
            </div>
        </>
    )
}

export default SkillCard