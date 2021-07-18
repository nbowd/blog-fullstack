import styled from "styled-components"

export default styled.div`
  display:flex;
  flex-direction:column;
  width: 12rem;
  font-size:18px;
  & input {
    background-color: ${props => props.theme.colors.blog};
    border-radius: 6px;
    padding: 3px;
  }
`