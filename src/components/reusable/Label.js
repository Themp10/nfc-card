import React from 'react'
import "./label.css";

const Label = ({text,color}) => {
  return (
    <span className={'label '+color}>{text}</span>
  )
}

export default Label