import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet, injectGlobal } from 'styled-components'
import styledNormalize from 'styled-normalize'
import styledSanitize from 'styled-sanitize'

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  ${styledNormalize}
  ${styledSanitize}

  html {
    font-family: sans-serif;    
    -webkit-tap-highlight-color: transparent;
    -webkit-tap-highlight-color: transparent;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%
  }

  body {
    background: #fff;
    font-size: 14px;
    color: #252525;
    font-family: Roboto,sans-serif;
    text-rendering: optimizelegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0
  }

  button,html input[type="button"],input[type="reset"],input[type="submit"] {
    cursor: pointer;
    font-family: Circular,"Helvetica Neue",Helvetica,Arial,sans-serif !important;    
  }

  button:focus {
    outline:0;
  }

  @font-face {
    font-family: RobotoFallBack;
    src: local('Roboto Bold'),local('Roboto-Bold'),url(https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOJBw1xU1rKptJj_0jans920.woff2) format('woff2')
  }
`

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    return (
      <html>
        <Head>
          <title>Carrefour UAE</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <link
            rel="stylesheet"
            href="/static/font-awesome-4.7.0/css/font-awesome.min.css"
          />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
