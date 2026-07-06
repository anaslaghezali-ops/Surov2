// Frontend - Modular Architecture
import Router from './modules/router.js';
import AuthModule from './modules/auth.js';
import SubscribeModule from './modules/subscribe.js';
import ClaimsModule from './modules/claims.js';
import ContactModule from './modules/contact.js';

class SuroApp {
  constructor() {
    this.router = new Router();
    this.auth = new AuthModule();
    this.subscribe = new SubscribeModule();
    this.claims = new ClaimsModule();
    this.contact = new ContactModule();
    this.init();
  }

  async init() {
    this.router.init();
    await this.auth.init();
  }
}

window.app = new SuroApp();
