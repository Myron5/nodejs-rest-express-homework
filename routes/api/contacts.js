const express = require('express');
const ctrl = require('../../controllers/contacts');
const { isValidId, validateBody, authenticate } = require('../../middlewares');
const { flag, flagSchema, updateFavoriteSchema } = require('../../schemas');

const router = express.Router();

router.get('/', authenticate, ctrl.getAll);

router.get('/:contactId', authenticate, isValidId, ctrl.getById);

router.delete('/:contactId', authenticate, isValidId, ctrl.deleteById);

router.post('/', authenticate, validateBody(flagSchema(flag.ADD)), ctrl.add);

router.put('/:contactId', authenticate, isValidId, validateBody(flagSchema(flag.UPDATE)), ctrl.updateById);

router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(updateFavoriteSchema), ctrl.updateFavoriteById);

module.exports = router;
