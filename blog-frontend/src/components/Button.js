import React from 'react'
import styled, { css } from 'styled-components'


const Button = styled.button`
  cursor: pointer;
  border-radius: 12px;
  margin: 5px 0;
  padding: 5px;
  background: ${props => props.theme.colors.primary};
  font-size: 20px;
  color: white;
  transition: all 0.2s ease 0s;
  &:hover{
    background: white;
    color: ${props => props.theme.colors.primary};
  } 
  ${({secondary, danger, details, deleteBtn})=> {
    if (secondary) {
      return css`
        background: ${props => props.theme.colors.secondary};
        font-size: 13px;
      `} else if (danger) {
        return css`
          background: ${props => props.theme.colors.blog};
        `
      } else if (details) {
        return css`
          background: ${props => props.theme.colors.primary};
          font-size: 13px;
        `
      } else if (deleteBtn) {
        return css`
          background: white;
          color: ${props => props.theme.colors.delete};
          border-color: ${props => props.theme.colors.delete};
          font-size: 10px;
          font-weight:bold;
          &:hover {
            background: ${props => props.theme.colors.delete};
            color:white;
          }
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
  danger,
  details,
  deleteBtn
}) {
  return <Button 
    onClick={onClick} 
    data-cy={dataCy} 
    type={type} 
    secondary={secondary} 
    danger={danger}
    details={details}
    deleteBtn={deleteBtn}
    >
      {text}
    </Button>

  
}

export default StyledButton
