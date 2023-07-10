const nodemailer = require('nodemailer');

const { getViewsHTML } = require('../helpers');
const { brevoConfig, mailtrapConfig } = require('../constants');

const { BREVO_USER, MAILTRAP_FROM } = process.env;

class Email {
  constructor(email, url) {
    this.from = process.env.NODE_ENV === 'development' ? MAILTRAP_FROM : BREVO_USER;
    this.to = email;
    this.url = url;
  }

  _initTransport() {
    if (process.env.NODE_ENV === 'development') {
      return nodemailer.createTransport(mailtrapConfig);
    }
    return nodemailer.createTransport(brevoConfig);
  }

  async _send(templateName, subject) {
    const { from, to, url } = this;
    const { html, text } = getViewsHTML(templateName, { url });
    const emailConfig = { from, to, subject, html, text };
    await this._initTransport().sendMail(emailConfig);
  }

  async sendVerification() {
    await this._send('emailTemplate.pug', 'Email verification');
  }
}

module.exports = Email;
