import React, { useId } from "react";
import { getIconComponent } from "@/app/components/portfolio/icons";

interface GradientIconProps {
  iconName: string;
  size?: number;
  library?: "si" | "fa" | "ai" | "ri" | "tb";
  gradient?: [string, string]; // e.g. ['#ff8a00', '#e52e71']
  uniqueId?: string; // optional: used if rendering in a list
}

const GradientIcon: React.FC<GradientIconProps> = ({
  iconName,
  size = 100,
  gradient = ["rgba(58, 58, 58, 0.5)", "rgba(58, 58, 58, 0.1)"],
  uniqueId,
}) => {
  const reactId = useId();
  const IconComponent = getIconComponent(iconName);

  if (!IconComponent) return null;

  const stableId = reactId.replace(/:/g, '');
  const gradientId = `gradient-${iconName}-${uniqueId || stableId}`;

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
