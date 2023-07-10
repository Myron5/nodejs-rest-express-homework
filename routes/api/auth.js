const express = require('express');

const ctrl = require('../../controllers/auth');
const { registerLoginSchema, emailSchema } = require('../../schemas');
const { validateBody, isUniqueEmail, isVerifiedEmail, authenticate, upload, isValidPath } = require('../../middlewares');

const router = express.Router();

router.post('/register', isUniqueEmail, validateBody(registerLoginSchema), ctrl.register);

router.post('/login', isVerifiedEmail, validateBody(registerLoginSchema), ctrl.login);

router.get('/current', authenticate, ctrl.current);

router.post('/logout', authenticate, ctrl.logout);

router.patch('/avatars', authenticate, isValidPath, upload, ctrl.avatarsCloud);

router.get('/verify/:verificationToken', ctrl.verify);

router.post('/verify', validateBody(emailSchema), ctrl.reverify);

module.exports = router;
