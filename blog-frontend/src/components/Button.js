import React from 'react'

function Button({
  onClick ,
  dataCy,
  text,
  type
}) {
  return <button onClick={onClick} data-cy={dataCy} type={type}>{text}</button>
}

export default Button
