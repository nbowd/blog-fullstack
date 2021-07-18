import React from 'react'
import styled from 'styled-components'

const Message = styled.p`
  width:50%;
  font-size:1.2rem;
  font-weight:bold;
`

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return <Message>{message}</Message>
  
}

export default Notification