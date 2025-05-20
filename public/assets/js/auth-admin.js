document.addEventListener('DOMContentLoaded', () => {
    const adminLoginForm = document.getElementById('adminLoginForm');
    const adminLogoutBtn = document.getElementById('adminLogoutBtn');
    const forgotPasswordLink = document.getElementById('forgotPassword');
    const firstAccessLink = document.getElementById('firstAccess');

    // Verifica se está logado ao carregar páginas protegidas
    // (Isso seria feito no início de cada script de página protegida ou em um script global)
    if (document.body.classList.contains('dashboard-body') && localStorage.getItem('isAdminLoggedIn') !== 'true') {
        window.location.href = 'login.html'; // Ou o caminho correto para login.html
    }

    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const emailOrPhone = document.getElementById('emailOrPhone').value;
            const password = document.getElementById('password').value;

            // --- SIMULAÇÃO DE LOGIN ---
            // Em uma aplicação real, você faria uma consulta ao Firebase Realtime DB
            // para encontrar o usuário pelo email/telefone e comparar a senha (hasheada).

            // Exemplo de dados mockados (no futuro, virão do Firebase)
            const MOCK_ADMIN_USER = {
                email: "admin@erika.com",
                phone: "11999990000",
                passwordHash: "simulated_hashed_password", // Em produção, seria um hash bcrypt
                name: "Admin Érika"
            };

            if ((emailOrPhone === MOCK_ADMIN_USER.email || emailOrPhone === MOCK_ADMIN_USER.phone) && password === "admin123") { // Simulação de verificação de senha
                console.log("Login bem-sucedido (simulado)");
                localStorage.setItem('isAdminLoggedIn', 'true');
                localStorage.setItem('adminUserName', MOCK_ADMIN_USER.name);
                localStorage.setItem('adminUserContact', emailOrPhone); // Guardar identificador
                window.location.href = 'dashboard.html';
            } else {
                alert("Email/Telefone ou senha inválidos. (Simulado)");
            }
            // --- FIM DA SIMULAÇÃO ---
        });
    }

    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem('isAdminLoggedIn');
            localStorage.removeItem('adminUserName');
            localStorage.removeItem('adminUserContact');
            console.log("Logout realizado.");
            // O caminho para login.html pode precisar ser ajustado dependendo de onde o dashboard.html está
            let loginPath = 'login.html';
            if (!window.location.pathname.endsWith('admin/')) { // Se não estiver na raiz de /admin/
                 // Tenta descobrir o caminho relativo correto
                const pathSegments = window.location.pathname.split('/');
                const adminDirIndex = pathSegments.indexOf('admin');
                if (adminDirIndex !== -1 && adminDirIndex < pathSegments.length -1) {
                    const depth = pathSegments.length -1 - (adminDirIndex + 1) ;
                    loginPath = '../'.repeat(depth) + 'login.html';
                } else if (adminDirIndex !== -1 && adminDirIndex === pathSegments.length -1) {
                     loginPath = 'login.html'; // já está na raiz /admin/
                } else {
                    loginPath = 'login.html'; // fallback
                }
            }
            window.location.href = loginPath;
        });
    }

    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Funcionalidade "Esqueci minha senha" ainda não implementada.');
            // Aqui você iniciaria o fluxo de recuperação de senha.
            // 1. Pedir email/telefone.
            // 2. Verificar se existe no DB.
            // 3. Enviar um link/código de redefinição (complexo sem backend).
            //    Alternativa: Pergunta de segurança (menos seguro).
            //    Ou, para o admin, pode ser um processo manual.
        });
    }

    if (firstAccessLink) {
        firstAccessLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Funcionalidade "Primeiro acesso" ainda não implementada.');
            // Aqui você iniciaria o fluxo de criação de senha para um usuário pré-cadastrado.
            // 1. Pedir email/telefone para identificar o usuário.
            // 2. Verificar se o usuário existe e se o campo "password" está vazio/nulo.
            // 3. Permitir que o usuário defina uma nova senha.
            // 4. Hashear a senha e salvar no Firebase Realtime DB.
        });
    }
});