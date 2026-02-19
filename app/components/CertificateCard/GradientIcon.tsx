import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as TbIcons from "react-icons/tb";

interface GradientIconProps {
  iconName: string;
  size?: number;
  library?: "si" | "fa" | "ai" | "ri" | "tb";
  gradient?: [string, string]; // e.g. ['#ff8a00', '#e52e71']
  uniqueId?: string; // optional: used if rendering in a list
}

const iconLibraries: Record<string, Record<string, any>> = {
  si: SiIcons,
  fa: FaIcons,
  ai: AiIcons,
  ri: RiIcons,
  tb: TbIcons,
};

const GradientIcon: React.FC<GradientIconProps> = ({
  iconName,
  size = 100,
  library = "si",
  gradient = ["rgba(58, 58, 58, 0.5),", "rgba(58, 58, 58, 0.1)"],
  uniqueId,
}) => {
  const IconPack = iconLibraries[library];
  const IconComponent = IconPack?.[iconName];

  if (!IconComponent) return null;

  const gradientId = `gradient-${iconName}-${uniqueId || Math.random().toString(36).slice(2)}`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gradient[0]} />
          <stop offset="100%" stopColor={gradient[1]} />
        </linearGradient>
      </defs>
      <foreignObject width={size} height={size}>
        <div style={{ width: "100%", height: "100%" }}>
          <IconComponent style={{ width: "100%", height: "100%", fill: `url(#${gradientId})` }} />
        </div>
      </foreignObject>
    </svg>
  );
};

export default GradientIcon;
