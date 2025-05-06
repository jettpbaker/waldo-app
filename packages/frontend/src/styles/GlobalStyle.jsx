// src/styles/GlobalStyle.jsx
import { createGlobalStyle } from 'styled-components'

const reset = `
/* 1. Box-sizing reset */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* 2. Remove default margin & padding */
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  figure,
  blockquote,
  dl,
  dd,
  ul,
  ol {
    margin: 0;
    padding: 0;
  }

  /* 3. Remove list styles on ul/ol */
  ul,
  ol {
    list-style: none;
  }

  /* 4. Make images, videos, canvas, svg scale responsively */
  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  /* 5. Improve text rendering */
  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* 6. Anchor default */
  a {
    text-decoration: none;
    color: inherit;
  }

  /* 7. Form elements inherit font */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  /* 8. Remove built-in form styles (iOS) */
  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: none;
    appearance: none;
    background: none;
    border: none;
    cursor: pointer;
  }
`

export const GlobalStyle = createGlobalStyle`
  ${reset}


  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;

    background-color: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.fg};

  }
`
