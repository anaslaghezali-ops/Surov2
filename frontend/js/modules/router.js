// modules/router.js
export default class Router {
  constructor() {
    this.routes = {
      'home': () => this.renderHome(),
      'offers': () => this.renderOffers(),
      'subscribe': () => this.renderSubscribe(),
      'login': () => this.renderLogin(),
      'dashboard': () => this.renderDashboard(),
      'claim': () => this.renderClaim(),
      'contact': () => this.renderContact()
    };
    this.currentPage = 'home';
  }

  init() {
    window.addEventListener('hashchange', () => this.navigate());
    this.navigate();
  }

  navigate(page = this.getPage()) {
    this.currentPage = page;
    const handler = this.routes[page] || this.routes['home'];
    handler();
  }

  getPage() {
    return window.location.hash.slice(1) || 'home';
  }

  renderHome() { /* Render home */ }
  renderOffers() { /* Render offers */ }
  renderSubscribe() { /* Render subscribe form */ }
  renderLogin() { /* Render login */ }
  renderDashboard() { /* Render dashboard */ }
  renderClaim() { /* Render claim form */ }
  renderContact() { /* Render contact */ }
}
