const express = require('express');

const ctrl = require('../../controllers/auth');
const { validateBody, isUniqueEmail, authenticate, upload } = require('../../middlewares');
const { registerLoginSchema } = require('../../schemas');

const router = express.Router();

router.post('/register', isUniqueEmail, validateBody(registerLoginSchema), ctrl.register);

router.post('/login', validateBody(registerLoginSchema), ctrl.login);

router.get('/current', authenticate, ctrl.current);

router.post('/logout', authenticate, ctrl.logout);

router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.avatars);

module.exports = router;
