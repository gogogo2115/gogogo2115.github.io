import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  *,*::before,*::after { box-sizing: border-box; }
  * { padding: 0; margin: 0; min-width: 0; min-height: 0; font: inherit; }

  html, body{
    width: 100%;
    height: 100%;
  };

  html{
    font-size: 10px;
  }

  body {
    font-size: 1.4rem;
    line-height: 1.5;

    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;

    margin: 0;
    min-height: 100%;
    @supports (min-height: 100dvh) {
      min-height: 100dvh;
    }
  }


  a {
    color: inherit;
    text-decoration: none;
  }


`;

export default GlobalStyle;
