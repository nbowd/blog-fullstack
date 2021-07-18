import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import GlobalStyle from './themes/GlobalStyles'
import {ThemeProvider} from 'styled-components'
import Theme from './themes/theme'

document.body.style = `background-color: #F7F5E6; margin:1rem 25%; color: ${props => props.theme.colors.primary};`
ReactDOM.render(
<ThemeProvider theme={Theme}>
  <GlobalStyle />
  <App />
</ThemeProvider>
, document.getElementById('root'))