# 🟢 PicPay - Clone de Interface e Captura

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

Um estudo de caso sobre engenharia de front-end e fluxo de dados, replicando com alta fidelidade a interface de login em múltiplas etapas do PicPay. Este projeto foi desenvolvido com foco educacional, para aprimorar técnicas de HTML, CSS e JavaScript Vanilla, integrados a um backend simples com Node.js e Express.

<br>

## 🎨 Demonstração Visual do Fluxo

O sistema simula a experiência completa do usuário, desde o login inicial até a validação final do token.

**Etapa 1: Login Inicial**
<br>
*O usuário insere suas credenciais (CPF e Senha).*
<br>
<img src="https://raw.githubusercontent.com/only-dpp/piquipei/refs/heads/main/img/cpf%20%2B%20senha.png" alt="Tela de Login" width="600"/>

**Etapa 2: Confirmação de Segurança**
<br>
*Após o login, o usuário é direcionado para uma tela de verificação, simulando um segundo fator de autenticação.*
<br>
<img src="https://raw.githubusercontent.com/only-dpp/piquipei/refs/heads/main/img/confirmação.png" alt="Tela de Confirmação" width="600"/>

**Etapa 3: Inserção do Token**
<br>
*A etapa final, onde o usuário insere o código de 6 dígitos que teria recebido.*
<br>
<img src="https://raw.githubusercontent.com/only-dpp/piquipei/refs/heads/main/img/codigo6.png" alt="Tela de Token" width="600"/>

<br>

## ✨ Funcionalidades

-   **Clone Pixel-Perfect:** Interface replicada com atenção aos detalhes, incluindo fontes, cores, espaçamentos e responsividade.
-   **Fluxo de Múltiplas Etapas:** Simulação completa do funil de login, guiando o usuário por 3 páginas distintas.
-   **Persistência de Dados Temporária:** Uso de `sessionStorage` para transportar os dados do usuário (CPF e Senha) entre as páginas de forma segura e invisível.
-   **Backend Simples para Captura:** Servidor em Node.js com Express para receber e registrar os dados enviados pelo front-end em um arquivo de log local (`cpf_passwords.txt`).
-   **Design Responsivo:** Layout adaptado para uma experiência de uso fluida em dispositivos móveis.
-   **Lógica com JavaScript Puro:** Todas as interações do front-end são construídas com JavaScript Vanilla, sem frameworks.

<br>

## 🚀 Tecnologias Utilizadas

O projeto foi construído com uma stack moderna e focada na simplicidade e eficiência.

#### **Backend**
*   **Node.js:** Ambiente de execução para o JavaScript no lado do servidor.
*   **Express.js:** Framework minimalista para a criação das rotas da API de captura.
*   **CORS:** Middleware para permitir a comunicação entre o front-end e o backend.

#### **Frontend**
*   **HTML5:** Estruturação semântica de todas as páginas.
*   **CSS3:** Estilização de alta fidelidade e implementação do design responsivo com Flexbox e Media Queries.
*   **JavaScript (ES6+):** Manipulação do DOM, controle do fluxo de páginas, validações e comunicação com o backend via `fetch()`.

<br>

## 🔧 Instalação e Execução

Para rodar este projeto localmente, siga os passos abaixo.

1.  **Clone o repositório:**
    ```bash
    https://github.com/only-dpp/piquipei.git
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd piquipei
    ```

3.  **Instale as dependências do Node.js:**
    *(Isso criará a pasta `node_modules` com o Express e o Cors)*
    ```bash
    npm install
    ```

4.  **Inicie o servidor:**
    ```bash
    node server.js
    ```

5.  **Acesse a aplicação:**
    Abra seu navegador e vá para `http://localhost:3000`.

<br>

## 📂 Estrutura de Arquivos

A estrutura do projeto foi organizada para manter uma clara separação entre o código do servidor e os arquivos públicos do cliente.

---

## ⚠️ Aviso Importante

Este projeto foi criado estritamente para **fins educacionais** e como um portfólio para demonstrar habilidades de desenvolvimento web.

**NÃO UTILIZE ESTE PROJETO PARA FINS MALICIOSOS, PHISHING OU QUALQUER ATIVIDADE ILEGAL.**

O objetivo é o estudo de design de interface, experiência do usuário e a integração cliente-servidor, e não a apropriação indevida de identidade visual ou a engenharia social. O autor não se responsabiliza pelo mau uso do código aqui apresentado.
