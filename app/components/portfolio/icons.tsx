import React, { JSX } from 'react';
import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaBootstrap,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaFigma,
  FaLayerGroup,
  FaClock,
  FaGlobe,
  FaCode,
  FaBriefcase,
  FaAward,
  FaGraduationCap,
  FaCertificate,
  FaDatabase
} from 'react-icons/fa';
import { BiLogoTypescript, BiLogoVisualStudio, BiLogoTailwindCss, BiCodeAlt } from 'react-icons/bi';
import { TbBrandTailwind, TbBrandNextjs, TbBrandTypescript, TbBrandReact, TbBrandJavascript } from 'react-icons/tb';
import {
  SiAdobexd,
  SiUdemy,
  SiTopcoder,
  SiAccenture,
  SiC,
  SiHackerrank,
  SiCoursera,
  SiGoogle,
  SiFreecodecamp,
  SiMeta,
  SiLinkedin,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiTypescript,
  SiNextdotjs,
  SiReact,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiVercel
} from 'react-icons/si';
import { MdWeb, MdCode, MdLaptopMac, MdDesignServices, MdOutlineSchool } from 'react-icons/md';
import {
  LuCamera,
  LuGlobe,
  LuYoutube,
  LuHeart,
  LuCalendarDays,
  LuCode,
  LuBookOpen,
  LuSparkles,
  LuTerminal
} from 'react-icons/lu';
import {
  RiReactjsFill,
  RiBootstrapLine,
  RiJavascriptLine,
  RiNextjsLine,
  RiHtml5Line,
  RiCss3Line,
  RiTailwindCssLine,
  RiNodejsLine,
  RiCodeSSlashLine
} from 'react-icons/ri';

// Centralized icon map for Skills, Stats, Certificates, and Tech Badges
export const ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties; size?: number | string }>> = {
  // Skills
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  BiLogoTypescript,
  FaBootstrap,
  TbBrandTailwind,
  FaReact,
  TbBrandNextjs,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaFigma,
  SiAdobexd,
  BiLogoVisualStudio,
  BiLogoTailwindCss,
  TbBrandTypescript,
  TbBrandReact,
  TbBrandJavascript,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiTypescript,
  SiNextdotjs,
  SiReact,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiVercel,
  FaDatabase,

  // Stats
  MdWeb,
  MdCode,
  MdLaptopMac,
  MdDesignServices,
  MdOutlineSchool,
  FaLayerGroup,
  FaClock,
  FaCode,
  FaBriefcase,
  FaAward,

  // Certificates
  SiUdemy,
  SiTopcoder,
  SiAccenture,
  SiC,
  SiHackerrank,
  SiCoursera,
  SiGoogle,
  SiFreecodecamp,
  SiMeta,
  SiLinkedin,
  FaGraduationCap,
  FaCertificate,

  // Interests
  LuCamera,
  LuGlobe,
  LuYoutube,
  LuHeart,
  LuCalendarDays,
  LuCode,
  LuBookOpen,
  LuSparkles,
  LuTerminal,

  // Tech / Projects
  RiReactjsFill,
  RiBootstrapLine,
  RiJavascriptLine,
  RiNextjsLine,
  RiHtml5Line,
  RiCss3Line,
  RiTailwindCssLine,
  RiNodejsLine,
  RiCodeSSlashLine,
  FaGlobe,
};

export function renderIcon(iconName?: string | JSX.Element, fallback: React.ReactNode = <BiCodeAlt />): React.ReactNode {
  if (!iconName) return fallback;
  if (typeof iconName !== 'string') return iconName;

  const IconComponent = ICON_MAP[iconName];
  if (IconComponent) {
    return <IconComponent />;
  }

  return fallback;
}

export function getIconComponent(iconName?: string) {
  if (!iconName) return null;
  return ICON_MAP[iconName] || null;
}
