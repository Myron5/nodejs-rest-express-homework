const { BREVO_USER, BREVO_SMTP_KEY } = process.env;

const brevoConfig = {
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: BREVO_USER,
    pass: BREVO_SMTP_KEY,
  },
};

module.exports = brevoConfig;
