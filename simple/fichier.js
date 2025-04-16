// Classe pour gérer l'authentification
class AuthenticationManager {
    constructor() {
        // Récupération des éléments du DOM
        this.form = document.getElementById('loginForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.emailError = document.getElementById('emailError');
        this.passwordError = document.getElementById('passwordError');
        this.submitButton = document.getElementById('submitBtn');
        this.registerLink = document.getElementById('registerLink');
        this.initializeEventListeners();
    }
    initializeEventListeners() {
        // Événement de soumission du formulaire
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
        // Animations et validations en temps réel
        this.emailInput.addEventListener('focus', () => this.handleFocus(this.emailInput));
        this.passwordInput.addEventListener('focus', () => this.handleFocus(this.passwordInput));
        this.emailInput.addEventListener('blur', () => this.handleBlur(this.emailInput));
        this.passwordInput.addEventListener('blur', () => this.handleBlur(this.passwordInput));
        this.emailInput.addEventListener('input', () => this.validateEmail());
        this.passwordInput.addEventListener('input', () => this.validatePassword());
        // Gestion du lien d'inscription
        this.registerLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleRegisterClick();
        });
    }
    handleFocus(element) {
        element.classList.add('focus');
    }
    handleBlur(element) {
        element.classList.remove('focus');
        // Valider au moment où l'utilisateur quitte le champ
        if (element === this.emailInput) {
            this.validateEmail();
        }
        else if (element === this.passwordInput) {
            this.validatePassword();
        }
    }
    validateEmail() {
        const email = this.emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            this.showError(this.emailError, "L'email est requis");
            return false;
        }
        else if (!emailRegex.test(email)) {
            this.showError(this.emailError, "Veuillez entrer un email valide");
            return false;
        }
        else {
            this.clearError(this.emailError);
            this.emailInput.classList.add('success');
            return true;
        }
    }
    validatePassword() {
        const password = this.passwordInput.value;
        if (!password) {
            this.showError(this.passwordError, "Le mot de passe est requis");
            return false;
        }
        else if (password.length < 6) {
            this.showError(this.passwordError, "Le mot de passe doit contenir au moins 6 caractères");
            return false;
        }
        else {
            this.clearError(this.passwordError);
            this.passwordInput.classList.add('success');
            return true;
        }
    }
    showError(element, message) {
        var _a, _b;
        element.textContent = message;
        (_b = (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('input')) === null || _b === void 0 ? void 0 : _b.classList.remove('success');
    }
    clearError(element) {
        element.textContent = '';
    }
    handleSubmit() {
        // Valider les deux champs
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();
        if (isEmailValid && isPasswordValid) {
            // Simulation d'envoi des données
            const credentials = {
                email: this.emailInput.value,
                password: this.passwordInput.value
            };
            // Simuler une requête d'API
            this.simulateApiRequest(credentials);
        }
        else {
            // Animation d'erreur si validation échouée
            this.form.classList.add('shake');
            setTimeout(() => {
                this.form.classList.remove('shake');
            }, 600);
        }
    }
    simulateApiRequest(credentials) {
        // Changer l'état du bouton pour indiquer le chargement
        this.submitButton.textContent = 'Connexion en cours...';
        this.submitButton.disabled = true;
        // Simuler un délai de réseau
        setTimeout(() => {
            // Ici, vous feriez normalement un appel fetch() ou axios.post()
            console.log('Tentative de connexion avec:', credentials);
            // Simulation de réponse réussie
            if (credentials.email.includes('@') && credentials.password.length >= 6) {
                this.handleLoginSuccess();
            }
            else {
                this.handleLoginError();
            }
            // Réinitialiser le bouton
            this.submitButton.textContent = 'Se connecter';
            this.submitButton.disabled = false;
        }, 1500);
    }
    handleLoginSuccess() {
        alert('Connexion réussie! Redirection...');
        // Ici, vous redirigeriez normalement vers une page de tableau de bord
        // window.location.href = '/dashboard';
    }
    handleLoginError() {
        this.showError(this.emailError, "");
        this.showError(this.passwordError, "Email ou mot de passe incorrect");
        this.form.classList.add('shake');
        setTimeout(() => {
            this.form.classList.remove('shake');
        }, 600);
    }
    handleRegisterClick() {
        alert('Redirection vers la page d\'inscription...');
        // Redirection vers la page d'inscription
        // window.location.href = '/register';
    }
}
// Initialiser le gestionnaire d'authentification au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const authManager = new AuthenticationManager();
});
