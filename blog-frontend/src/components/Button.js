import React from 'react'
import styled, { css } from 'styled-components'


const Button = styled.button`
  display: block;
  cursor: pointer;
  border-radius: 12px;
  margin: 5px 0;
  background: ${props => props.theme.colors.main};
  font-size: 20px;
  color: white;
  ${({secondary, danger})=> {
    if (secondary) {
      return css`
        background: ${props => props.theme.colors.secondary};
      `} else if (danger) {
        return css`
          background: ${props => props.theme.colors.danger};
        `
      }
    }
  }

 
`;

function StyledButton({
  onClick ,
  dataCy,
  text,
  type,
  secondary,
  danger
}) {
  return <Button 
    onClick={onClick} 
    data-cy={dataCy} 
    type={type} 
    secondary={secondary} 
    danger={danger}
    >
      {text}
    </Button>

  
}

export default StyledButton
