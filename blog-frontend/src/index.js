import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import GlobalStyle from './themes/GlobalStyles'
import {ThemeProvider} from 'styled-components'
import Theme from './themes/theme'

document.body.style = 'background-color: #EAE7DC; margin:1rem 4rem;'
ReactDOM.render(
<ThemeProvider theme={Theme}>
  <GlobalStyle />
  <App />
</ThemeProvider>
, document.getElementById('root'))