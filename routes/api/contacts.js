const express = require("express");
const ctrl = require("../../controllers/contacts");
const { isValidId, validateBody } = require("../../middlewares");
const {
  addSchema,
  updateSchema,
  updateFavoriteSchema,
} = require("../../schemas");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.delete("/:contactId", isValidId, ctrl.deleteById);

router.post("/", validateBody(addSchema), ctrl.add);

router.put(
  "/:contactId",
  isValidId,
  validateBody(updateSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  ctrl.updateFavoriteById
);

module.exports = router;
