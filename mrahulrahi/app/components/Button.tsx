import { JSX } from "react";

interface Button {
  title: string;
  style: string;
  icon?: JSX.Element;
  url?: string;
  target?: string;
}

const Button = (props: Button) => {
  return (
    <a href={props.url} target={props.target} className={`btn btn-${props.style} d-flex align-items-center`}>
      {props.icon && <span className="btn-icon left">{props.icon}</span>}
      {props.title}
      {props.icon && <span className="btn-icon right">{props.icon}</span>}
    </a>
  )
}

export default Button