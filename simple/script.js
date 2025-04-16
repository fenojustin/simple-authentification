// Interface pour les données utilisateur
interface UserCredentials {
    email: string;
    password: string;
}

// Interface pour les messages d'erreur
interface ValidationErrors {
    email?: string;
    password?: string;
}

// Classe pour gérer l'authentification
class AuthenticationManager {
    private form: HTMLFormElement;
    private emailInput: HTMLInputElement;
    private passwordInput: HTMLInputElement;
    private emailError: HTMLElement;
    private passwordError: HTMLElement;
    private submitButton: HTMLButtonElement;
    private registerLink: HTMLAnchorElement;

    constructor() {
        // Récupération des éléments du DOM
        this.form = document.getElementById('loginForm') as HTMLFormElement;
        this.emailInput = document.getElementById('email') as HTMLInputElement;
        this.passwordInput = document.getElementById('password') as HTMLInputElement;
        this.emailError = document.getElementById('emailError') as HTMLElement;
        this.passwordError = document.getElementById('passwordError') as HTMLElement;
        this.submitButton = document.getElementById('submitBtn') as HTMLButtonElement;
        this.registerLink = document.getElementById('registerLink') as HTMLAnchorElement;

        this.initializeEventListeners();
    }

    private initializeEventListeners(): void {
        // Événement de soumission du formulaire
        this.form.addEventListener('submit', (e: Event) => {
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
        this.registerLink.addEventListener('click', (e: Event) => {
            e.preventDefault();
            this.handleRegisterClick();
        });
    }

    private handleFocus(element: HTMLInputElement): void {
        element.classList.add('focus');
    }

    private handleBlur(element: HTMLInputElement): void {
        element.classList.remove('focus');
        
        // Valider au moment où l'utilisateur quitte le champ
        if (element === this.emailInput) {
            this.validateEmail();
        } else if (element === this.passwordInput) {
            this.validatePassword();
        }
    }

    private validateEmail(): boolean {
        const email = this.emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            this.showError(this.emailError, "L'email est requis");
            return false;
        } else if (!emailRegex.test(email)) {
            this.showError(this.emailError, "Veuillez entrer un email valide");
            return false;
        } else {
            this.clearError(this.emailError);
            this.emailInput.classList.add('success');
            return true;
        }
    }

    private validatePassword(): boolean {
        const password = this.passwordInput.value;
        
        if (!password) {
            this.showError(this.passwordError, "Le mot de passe est requis");
            return false;
        } else if (password.length < 6) {
            this.showError(this.passwordError, "Le mot de passe doit contenir au moins 6 caractères");
            return false;
        } else {
            this.clearError(this.passwordError);
            this.passwordInput.classList.add('success');
            return true;
        }
    }

    private showError(element: HTMLElement, message: string): void {
        element.textContent = message;
        element.parentElement?.querySelector('input')?.classList.remove('success');
    }

    private clearError(element: HTMLElement): void {
        element.textContent = '';
    }

    private handleSubmit(): void {
        // Valider les deux champs
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();
        
        if (isEmailValid && isPasswordValid) {
            // Simulation d'envoi des données
            const credentials: UserCredentials = {
                email: this.emailInput.value,
                password: this.passwordInput.value
            };
            
            // Simuler une requête d'API
            this.simulateApiRequest(credentials);
        } else {
            // Animation d'erreur si validation échouée
            this.form.classList.add('shake');
            setTimeout(() => {
                this.form.classList.remove('shake');
            }, 600);
        }
    }

    private simulateApiRequest(credentials: UserCredentials): void {
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
            } else {
                this.handleLoginError();
            }
            
            // Réinitialiser le bouton
            this.submitButton.textContent = 'Se connecter';
            this.submitButton.disabled = false;
        }, 1500);
    }

    private handleLoginSuccess(): void {
        alert('Connexion réussie! Redirection...');
        // Ici, vous redirigeriez normalement vers une page de tableau de bord
        // window.location.href = '/dashboard';
    }

    private handleLoginError(): void {
        this.showError(this.emailError, "");
        this.showError(this.passwordError, "Email ou mot de passe incorrect");
        
        this.form.classList.add('shake');
        setTimeout(() => {
            this.form.classList.remove('shake');
        }, 600);
    }

    private handleRegisterClick(): void {
        alert('Redirection vers la page d\'inscription...');
        // Redirection vers la page d'inscription
        // window.location.href = '/register';
    }
}

// Initialiser le gestionnaire d'authentification au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const authManager = new AuthenticationManager();
});