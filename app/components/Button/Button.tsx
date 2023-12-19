import './Button.css'

interface Button {
  title: string;
  style: string;
  icon?: JSX.Element;
}

const Button = (props: Button) => {
  return (
    <a href="#!" className={`btn btn-${props.style} d-flex`}>
      {props.title}
      <span className='d-flex align-items-center justify-content-center ms-2'>
        {props.icon}
      </span>
    </a>
  )
}

export default Button