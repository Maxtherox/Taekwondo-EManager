## Documentação do Taekwondo E-manager (em desenvolvimento)

**Bem-vindo ao Taekwondo E-manager!**

Este é um guia para a aplicação web de gerenciamento de lutas, matchmaking e eventos de taekwondo.

**Observação:** Esta aplicação ainda está em desenvolvimento (WIP). Algumas funcionalidades e rotas ainda não foram implementadas, e a responsividade ainda não foi completamente programada.


**Funcionalidades Principais:**

* **Gerenciamento de Eventos:**
    * Criar, editar e excluir eventos de taekwondo.
    * Definir data, local e outras informações relevantes.
    * Cadastrar participantes em eventos.
* **Matchmaking:**
    * Gerar automaticamente o chaveamento de lutas com base nos participantes inscritos.
    * Considerar gênero, idade, faixa e peso para lutas justas.
* **Gerenciamento de Competidores:**
    * Cadastrar competidores com informações como nome, idade, faixa, peso e gênero.
    * Editar e excluir informações de competidores.
* **Gerenciamento de Usuários:**
    * Cadastrar usuários com diferentes roles (ex: administrador, professor, aluno).
    * Autenticar usuários para acesso à aplicação.
* **Relatórios e Logs:**
    * Gerar relatórios de eventos e competidores.
    * Registrar logs de atividades para auditoria.

**Rotas Principais:**

* **Administração:**
    * As rotas de administração estão 85% funcionais.
    * Permite gerenciar eventos, competidores e usuários.
    * Ainda falta a criação da visualização de cada aluno/professor individualmente e a funcionalidade de cadastrar aluno no evento (frontend).
* **Backend:**
    * O backend está 100% completo em termos de rotas.
    * As funcionalidades de backend estão implementadas.
    * Ainda é necessário realizar ajustes e adicionar features no frontend.
* **Frontend:**
    * O frontend está em desenvolvimento.
    * A responsividade ainda não foi implementada.
    * Algumas páginas e componentes ainda não foram 100% estilizados.
    * Animações ainda pendentes


**Tecnologias Utilizadas:**

* **Backend:**
    * Node.js
    * Express.js (framework web)
    * Knex.js (query builder para SQL)
    * SQLite3 (banco de dados) ***em breve migrarei para o postgresSQL***
    * Bcrypt.js (para hash de senhas)
    * Jsonwebtoken (para geração de tokens JWT)

* **Frontend:**
    * React
    * Vite (ferramenta de build)
    * JavaScript
    * CSS in JS


**Instalação:**

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/Taekwondo-EManager.git
   ```

2. **Instalar as dependências:**
   ```bash
   cd Taekwondo-EManager
   npm install
   ```

3. **Configurar o banco de dados:**
   * Exclua o banco de dados atual: `/src/database/database.db`
   * Ajustar as configurações de conexão no arquivo `knexfile.js`.
   * Executar as migrations:
     ```bash
     npx knex migrate:latest
     ```

4. **Iniciar a aplicação:**
   ```bash
   npm run dev
   ```

5. **Iniciar o frontend** 
    ```bash
    cd frontend/tkd_frontend

    npm install

    npm run dev

    ```

6. **CORS**
   * Certifique-se que as politicas de CORS estão sendo atendidas e que as rotas estão corretas em: `/src/server.js` e `/frontend/tkd_frontend/src/services/api.js`

**Observações:**

* Certifique-se de ter o Node.js e o npm instalados em sua máquina.
* A responsividade da aplicação ainda não foi programada.
* A funcionalidade de visualizar e cadastrar alunos em eventos ainda não está completa.
* A maior parte das features e ajustes ainda precisam ser implementadas no frontend.

**Solução de Problemas:**

* **Erro de conexão com o banco de dados:** Verifique as configurações de conexão no arquivo `knexfile.js`.
* **Erro ao executar migrations:** Certifique-se de ter o PostgreSQL instalado e configurado corretamente.
* **Erro ao iniciar a aplicação:** Verifique se todas as dependências foram instaladas corretamente.

**Contribuições:**

Contribuições são bem-vindas! Sinta-se à vontade para reportar bugs, sugerir melhorias ou enviar pull requests.

**Agradecemos por usar o Taekwondo E-manager!**