const express = require("express");
const ctrl = require("../../controllers/auth");
const { validateBody, isUniqueEmail } = require("../../middlewares");
const { registerSchema, loginSchema } = require("../../schemas");

const router = express.Router();

router.post(
  "/register",
  isUniqueEmail,
  validateBody(registerSchema),
  ctrl.register
);

router.post("/login", validateBody(loginSchema), ctrl.login);

module.exports = router;
