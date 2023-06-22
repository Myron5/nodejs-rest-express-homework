const express = require("express");
const ctrl = require("../../controllers/contacts");
const { isValidId, validateBody } = require("../../middlewares");
const { flag, flagSchema, updateFavoriteSchema } = require("../../schemas");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.delete("/:contactId", isValidId, ctrl.deleteById);

router.post("/", validateBody(flagSchema(flag.ADD)), ctrl.add);

router.put(
  "/:contactId",
  isValidId,
  validateBody(flagSchema(flag.UPDATE)),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  ctrl.updateFavoriteById
);

module.exports = router;
