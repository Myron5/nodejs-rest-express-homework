const express = require('express');

const ctrl = require('../../controllers/auth');
const { registerLoginSchema, emailSchema } = require('../../schemas');
const { validateBody, isUniqueEmail, isVerifiedEmail, authenticate, upload, isValidPath } = require('../../middlewares');

const router = express.Router();

router.post('/register', isUniqueEmail, validateBody(registerLoginSchema), ctrl.register);

router.get('/verify/:verificationToken', ctrl.verify);

router.post('/verify', validateBody(emailSchema), ctrl.reverify);

router.post('/login', isVerifiedEmail, validateBody(registerLoginSchema), ctrl.login);

router.get('/current', authenticate, ctrl.current);

router.post('/logout', authenticate, ctrl.logout);

router.patch('/avatars', authenticate, upload, isValidPath, ctrl.avatars);

module.exports = router;
