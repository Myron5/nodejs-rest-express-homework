const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.delete("/:contactId", ctrl.deleteById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.put("/:contactId", validateBody(schemas.updateSchema), ctrl.updateById);

module.exports = router;
