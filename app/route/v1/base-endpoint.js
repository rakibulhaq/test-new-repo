const router = require('express').Router();

const BaseEndpointController = require('../../api/v1/base-endpoint').BaseEndpointController;

let baseEndpointController = new BaseEndpointController();

router.get('/', baseEndpointController.getAll);
router.get('/:id', baseEndpointController.getBaseEndpointInfo);
router.post('/', baseEndpointController.create);
router.delete('/:id', baseEndpointController.remove);
router.put('/:id', baseEndpointController.update);

module.exports = router;