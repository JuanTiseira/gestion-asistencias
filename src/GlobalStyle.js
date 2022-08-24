import { createGlobalStyle, css } from 'styled-components';

export const GlobalStyle = createGlobalStyle`${css`
  :root {
    --maxWidth: 1280px;
    --white: #fff;
    --lightGrey: #eee;
    --medGrey: #353535;
    --darkGrey: #1c1c1c;
    --fontSuperBig: 2.5rem;
    --fontBig: 1.5rem;
    --fontMed: 1.2rem;
    --fontSmall: 1rem;
    --primaryColor: #6a2c70;
    --secondaryColor: #f9ed69;
  }

  * {
    box-sizing: border-box;
    font-family: 'Dosis', sans-serif;
  }

  body {
    margin: 0;
    padding: 0;
    background-image: linear-gradient(90deg, #b83b5e, #f08a5d);

    h1 {
      font-size: 2rem;
      font-weight: 600;
      color: var(--darkGrey);
    }
    h3 {
      font-size: 1.1rem;
      font-weight: 600;
    }
    p {
      font-size: 1rem;
      color: var(--darkGrey);
    }
  }
`}`;
