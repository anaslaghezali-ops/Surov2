/**
 * SURO App - Main Application Router
 * Handles page navigation, dynamic loading, and event management
 */

class SuroApp {
    constructor() {
        this.currentPage = 'home';
        this.pages = {
            home: null,
            offers: null,
            faq: null,
            contact: null,
            subscribe: null,
            auth: null,
            dashboard: null,
            claim: null
        };
        this.user = localStorage.getItem('user');
        this.token = localStorage.getItem('token');
        this.init();
    }

    /**
     * Initialize the app
     */
    async init() {
        console.log('[SURO] Initializing application...');
        
        // Load external pages
        await this.loadPages();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Show home page
        this.showPage('home');
        
        console.log('[SURO] Application initialized successfully ✓');
    }

    /**
     * Load external HTML pages dynamically
     */
    async loadPages() {
        const pageFiles = ['subscribe', 'auth', 'dashboard', 'claim'];
        
        for (const page of pageFiles) {
            try {
                const response = await fetch(`${page}.html`);
                if (!response.ok) {
                    console.warn(`[SURO] Page ${page}.html not found`);
                    continue;
                }
                const html = await response.text();
                this.pages[page] = html;
                console.log(`[SURO] Loaded ${page}.html ✓`);
            } catch (error) {
                console.error(`[SURO] Error loading ${page}.html:`, error);
            }
        }
    }

    /**
     * Show a specific page
     */
    showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('section[id="home"], section[id="offers"], section[id="faq"], section[id="contact"], section[id="subscribe"], section[id="auth"], section[id="dashboard"], section[id="claim"]').forEach(page => {
            page.style.display = 'none';
        });

        // Load external page if needed
        if (this.pages[pageId] && !document.getElementById(pageId)) {
            const temp = document.createElement('div');
            temp.innerHTML = this.pages[pageId];
            document.querySelector('main').appendChild(temp.firstElementChild);
        }

        // Show selected page
        const page = document.getElementById(pageId);
        if (page) {
            page.style.display = 'block';
            
            // Special handlers
            if (pageId === 'dashboard') this.loadDashboard();
            
            window.scrollTo(0, 0);
            this.currentPage = pageId;
            console.log(`[SURO] Navigated to ${pageId}`);
        } else {
            console.warn(`[SURO] Page ${pageId} not found`);
        }
    }

    /**
     * Setup all event listeners for buttons
     */
    setupEventListeners() {
        console.log('[SURO] Setting up event listeners...');
        
        // Get all buttons
        const buttons = document.querySelectorAll('button');
        
        buttons.forEach(btn => {
            const text = btn.textContent.trim();
            
            // Souscrire button
            if (text === 'Souscrire') {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (!this.user) {
                        this.showPage('auth');
                    } else {
                        this.showPage('subscribe');
                    }
                });
            }
            
            // Voir offres button
            if (text === 'Voir offres') {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const offersSection = document.getElementById('offers');
                    if (offersSection) {
                        offersSection.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            }
            
            // Espace Client button
            if (text === 'Espace Client') {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (this.user) {
                        this.showPage('dashboard');
                    } else {
                        this.showPage('auth');
                    }
                });
            }
            
            // Choisir buttons (Offres)
            if (text === 'Choisir') {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (!this.user) {
                        this.showPage('auth');
                    } else {
                        this.showPage('subscribe');
                    }
                });
            }
        });
        
        console.log('[SURO] Event listeners setup complete ✓');
    }

    /**
     * Load dashboard data
     */
    loadDashboard() {
        if (!this.user) {
            this.showPage('auth');
            return;
        }
        console.log('[SURO] Loading dashboard for user:', this.user);
        // TODO: Load contracts and claims from backend
    }

    /**
     * Handle login form submission
     */
    async handleLogin(event) {
        event.preventDefault();
        console.log('[SURO] Login form submitted');
        
        try {
            const email = document.getElementById('loginEmail')?.value;
            const password = document.getElementById('loginPassword')?.value;
            
            if (!email || !password) {
                alert('Email et mot de passe requis');
                return;
            }
            
            console.log('[SURO] Login attempt for:', email);
            
            // TODO: Call backend API
            // For now, just simulate
            this.user = JSON.stringify({ email, name: email.split('@')[0] });
            localStorage.setItem('user', this.user);
            
            alert('✓ Connexion réussie!');
            this.showPage('dashboard');
            
        } catch (error) {
            console.error('[SURO] Login error:', error);
            alert('Erreur de connexion: ' + error.message);
        }
    }

    /**
     * Handle signup form submission
     */
    async handleSignup(event) {
        event.preventDefault();
        console.log('[SURO] Signup form submitted');
        
        try {
            const name = document.getElementById('signupName')?.value;
            const email = document.getElementById('signupEmail')?.value;
            const phone = document.getElementById('signupPhone')?.value;
            const password = document.getElementById('signupPassword')?.value;
            
            if (!name || !email || !phone || !password) {
                alert('Tous les champs sont requis');
                return;
            }
            
            console.log('[SURO] Signup attempt for:', email);
            
            // TODO: Call backend API
            // For now, just simulate
            this.user = JSON.stringify({ name, email, phone });
            this.token = 'temp-token-' + Date.now();
            localStorage.setItem('user', this.user);
            localStorage.setItem('token', this.token);
            
            alert('✓ Inscription réussie! Bienvenue ' + name);
            this.showPage('dashboard');
            
        } catch (error) {
            console.error('[SURO] Signup error:', error);
            alert('Erreur d\'inscription: ' + error.message);
        }
    }

    /**
     * Switch between login and signup
     */
    switchToSignup() {
        console.log('[SURO] Switching to signup');
        
        // Hide login form
        const loginForm = document.querySelector('form[onsubmit*="handleLogin"]')?.parentElement;
        if (loginForm) {
            loginForm.style.display = 'none';
        }
        
        // Show signup form
        const signupForm = document.querySelector('form[onsubmit*="handleSignup"]')?.parentElement;
        if (signupForm) {
            signupForm.style.display = 'block';
        }
    }

    /**
     * Switch to login
     */
    switchToLogin() {
        console.log('[SURO] Switching to login');
        
        // Show login form
        const loginForm = document.querySelector('form[onsubmit*="handleLogin"]')?.parentElement;
        if (loginForm) {
            loginForm.style.display = 'block';
        }
        
        // Hide signup form
        const signupForm = document.querySelector('form[onsubmit*="handleSignup"]')?.parentElement;
        if (signupForm) {
            signupForm.style.display = 'none';
        }
    }

    /**
     * Handle login (old method, kept for compatibility)
     */
    async login(email, password) {
        try {
            console.log('[SURO] Login attempt for:', email);
            // TODO: Call backend API
            this.user = JSON.stringify({ email, name: email.split('@')[0] });
            localStorage.setItem('user', this.user);
            this.showPage('dashboard');
        } catch (error) {
            console.error('[SURO] Login error:', error);
        }
    }

    /**
     * Handle logout
     */
    logout() {
        console.log('[SURO] Logout');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.user = null;
        this.token = null;
        this.showPage('home');
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new SuroApp();
});
