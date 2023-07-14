const { MAILTRAP_USER, MAILTRAP_PASSWORD } = process.env;

const mailtrapConfig = {
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: MAILTRAP_USER,
    pass: MAILTRAP_PASSWORD,
  },
};

module.exports = mailtrapConfig;
