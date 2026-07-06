// backend/services/contactService.js
const sgMail = require('@sendgrid/mail');

class ContactService {
  static async sendEmail(contactData) {
    // Configure SendGrid if API key exists
    if (process.env.SENDGRID_API_KEY) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      
      await sgMail.send({
        to: process.env.CONTACT_EMAIL || 'support@suro.ma',
        from: 'noreply@suro.ma',
        subject: `Contact: ${contactData.subject}`,
        html: `
          <h3>Nouveau message de contact</h3>
          <p><strong>Nom:</strong> ${contactData.name}</p>
          <p><strong>Email:</strong> ${contactData.email}</p>
          <p><strong>Sujet:</strong> ${contactData.subject}</p>
          <p><strong>Message:</strong> ${contactData.message}</p>
        `
      });
    }

    return { success: true };
  }
}

module.exports = ContactService;
