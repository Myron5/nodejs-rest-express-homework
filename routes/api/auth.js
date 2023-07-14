const express = require('express');

const ctrl = require('../../controllers/auth');
const { registerLoginSchema, emailSchema } = require('../../schemas');
const { validateBody, isUniqueEmail, isVerifiedEmail, authenticate, upload, isValidPath } = require('../../middlewares');

const router = express.Router();

router.post('/register', validateBody(registerLoginSchema), isUniqueEmail, ctrl.register);

router.post('/login', validateBody(registerLoginSchema), isVerifiedEmail, ctrl.login);

router.get('/current', authenticate, ctrl.current);

router.post('/logout', authenticate, ctrl.logout);

router.patch('/avatars', authenticate, upload, isValidPath, ctrl.avatarsCloud);

router.get('/verify/:verificationToken', ctrl.verifyEmail);

router.post('/verify', validateBody(emailSchema), ctrl.resendVerifyEmail);

module.exports = router;
