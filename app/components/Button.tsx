import React from 'react'
interface Button {
    title : string;
    style: string
}

const Button = (props : Button) => {
  return (
    <a href="#!" className={`btn btn-{props.style} green`}>{props.title}</a>
  )
}

export default Button