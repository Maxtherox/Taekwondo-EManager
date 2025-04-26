import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100vh;

    display: grid;
    grid-template-rows: 105px auto; /* Header e conteúdo principal */
    grid-template-areas:
    "header"
    "content";
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};

    > main {
        grid-area: content;
        overflow-y: auto;
        padding: 40px 64px; /* Adiciona padding ao redor do formulário */

        /* Ajuste de largura se necessário */
         max-width: 900px; /* Limita a largura do conteúdo principal */
         margin: 0 auto; /* Centraliza */
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;

    > header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 36px;

        > h1 {
            color: ${({ theme }) => theme.COLORS.ORANGE};
            font-size: 24px; // Ajuste se necessário
        }

        button { /* Estilo para o ButtonText "Voltar" */
            font-size: 16px;
            color: ${({ theme }) => theme.COLORS.GRAY_100};
        }
    }

    /* Remove margem padrão inferior do Input dentro da Section */
    section > div {
        margin-bottom: 0;
    }
`;

// Wrapper para o editor Quill para aplicar estilos específicos
export const QuillWrapper = styled.div`
    margin-top: 8px; // Espaço acima do editor

    .ql-toolbar { // Estiliza a barra de ferramentas
        background-color: #f3f3f3; // Cor de fundo leve
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        border-color: ${({ theme }) => theme.COLORS.LIGHT_LIGHT_400}; // Cor da borda
    }

    .ql-container { // Estiliza a área de edição
        min-height: 300px; // Altura mínima para o editor
        font-size: 16px; // Tamanho da fonte padrão no editor
        background-color: ${({ theme }) => theme.COLORS.LIGHT_LIGHT_100}; // Fundo branco
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        border-color: ${({ theme }) => theme.COLORS.LIGHT_LIGHT_400}; // Cor da borda

        /* Placeholder */
        .ql-editor.ql-blank::before{
            color: ${({ theme }) => theme.COLORS.GRAY_100};
            font-style: italic;
        }

        /* Cor do texto no editor */
         .ql-editor {
             color: ${({ theme }) => theme.COLORS.GRAY_300};
         }
    }

     margin-bottom: 32px; // Adiciona espaço abaixo do editor
`;