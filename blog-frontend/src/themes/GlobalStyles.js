import { createGlobalStyle } from "styled-components";
import Montserrat from '../assets/fonts/Montserrat-Regular.ttf'

const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: Montserrat;
    src: url(${Montserrat}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  html {
    height:100%;
  }

  * {
    padding: 0;
    margin: 0;
    font-family: Montserrat;
  }
`

export default GlobalStyle