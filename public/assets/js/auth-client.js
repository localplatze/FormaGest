document.addEventListener('DOMContentLoaded', () => {
    const clientLoginForm = document.getElementById('clientLoginForm');
    const clientLogoutBtn = document.getElementById('clientLogoutBtn');
    // Outros elementos (primeiro acesso, esqueci senha) podem ser adicionados aqui

    // Verifica se está logado ao carregar páginas protegidas
    function requireAuth() {
        if (!document.body.classList.contains('client-login-page') && localStorage.getItem('isClientLoggedIn') !== 'true') {
            // Tenta construir o caminho relativo para login.html
            let loginPath = 'login.html';
            const pathSegments = window.location.pathname.split('/');
            const clientDirIndex = pathSegments.indexOf('client');

            if (clientDirIndex !== -1 && clientDirIndex < pathSegments.length - 1) {
                const depth = pathSegments.length - 1 - (clientDirIndex + 1);
                loginPath = '../'.repeat(depth) + 'login.html';
            } else if (window.location.pathname.includes('/client/')) {
                 loginPath = 'login.html'; // Já está na raiz de /client/
            } else {
                // Se não estiver em /client/, assume que está na raiz do projeto ou em public/
                // e precisa subir para src/client/login.html
                // Isso é um fallback e pode precisar de ajuste
                loginPath = 'src/client/login.html'; 
                // Para index.html na raiz:
                if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
                     loginPath = 'src/client/login.html';
                }
            }
            window.location.href = loginPath;
        }
    }
    requireAuth();


    if (clientLoginForm) {
        clientLoginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const emailOrPhone = document.getElementById('emailOrPhoneClient').value;
            const password = document.getElementById('passwordClient').value;

            // --- SIMULAÇÃO DE LOGIN CLIENTE ---
            // No Firebase, buscaria o usuário e compararia a senha hasheada.
            const MOCK_CLIENT_USERS = {
                "cliente.alfa@exemplo.com": { uid: "uid2", name: "Cliente Alfa", passwordHash: "client_hashed_pass1", events: ["event1", "event2"]},
                "maria.c@example.com": { uid: "uid3", name: "Maria Contratante", passwordHash: "client_hashed_pass2", events: ["event3"]}
            };

            const clientUser = MOCK_CLIENT_USERS[emailOrPhone];

            if (clientUser && password === "cliente123") { // Simulação de verificação de senha
                console.log("Login do cliente bem-sucedido (simulado)");
                localStorage.setItem('isClientLoggedIn', 'true');
                localStorage.setItem('clientUserName', clientUser.name);
                localStorage.setItem('clientUserUid', clientUser.uid);
                localStorage.setItem('clientUserContact', emailOrPhone);
                // Redirecionar para a lista de eventos do cliente ou dashboard
                window.location.href = 'events.html'; 
            } else {
                alert("Email/Telefone ou senha inválidos. (Simulado)");
            }
            // --- FIM DA SIMULAÇÃO ---
        });
    }

    if (clientLogoutBtn) {
        clientLogoutBtn.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem('isClientLoggedIn');
            localStorage.removeItem('clientUserName');
            localStorage.removeItem('clientUserUid');
            localStorage.removeItem('clientUserContact');
            localStorage.removeItem('selectedClientEventId'); // Limpa evento selecionado
            localStorage.removeItem('selectedClientEventName');
            console.log("Logout do cliente realizado.");
            
            let loginPath = 'login.html'; // Default
             const pathSegments = window.location.pathname.split('/');
            const clientDirIndex = pathSegments.indexOf('client');
            if (clientDirIndex !== -1 && clientDirIndex < pathSegments.length -1) {
                const depth = pathSegments.length -1 - (clientDirIndex + 1) ;
                loginPath = '../'.repeat(depth) + 'login.html';
            }
            window.location.href = loginPath;
        });
    }

    // Lógica para menu mobile no header do cliente
    const clientMenuToggle = document.getElementById('clientMenuToggle');
    const clientNav = document.querySelector('.client-header nav');
    if (clientMenuToggle && clientNav) {
        clientMenuToggle.addEventListener('click', () => {
            clientNav.classList.toggle('active');
        });
    }
});