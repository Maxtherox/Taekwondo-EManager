import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    
    }

    :root{
        font-size: 62.5%;
    }
    body{
        background-color: ${({theme}) => theme.COLORS.LIGHT_LIGHT_100};
        color: ${({theme}) => theme.COLORS.DARK_BLACK_100};
        -webkit-font-smoothing: antialiased;
        
    }

    body, h2, button {
        font-family: 'Poppins', sans-serif;
        font-size: 1.6rem;
        outline: none;
    }

    label, input, footer, textarea, h1, a{
       font-family: 'Roboto', sans-serif;
    }

    button, a {
        cursor: pointer;
        transition: filter 0.2s;
    }

    a {
        text-decoration: none;
    }

    button:hover, a:hover {
        filter: brightness(0.9)
    }
    ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color:${({theme}) => theme.COLORS.LIGHT_LIGHT_300};
  }

  .post-content { // Ou diretamente ul, ol se não usar a classe
        // ... outros estilos para h1, p, etc ...

        ul, ol {
            /* Ajusta o padding esquerdo para trazer a lista para dentro */
            padding-left: 20px; /* Experimente valores como 1.5em, 20px, etc. */
            /* OU use list-style-position para colocar o marcador dentro do fluxo */
            /* list-style-position: inside; */

            margin-bottom: 1em; /* Mantém o espaçamento vertical */
            margin-left: 0; /* Garante que não haja margem externa empurrando */
        }

        li {
             margin-bottom: 0.5em; /* Espaçamento entre itens */
        }
    }
`;