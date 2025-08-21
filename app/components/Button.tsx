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
      {props.title}
      {props.icon && <i className="btn-icon d-flex align-items-center justify-content-center ms-2">
        {props.icon}
      </i>}
    </a>
  )
}

export default Button