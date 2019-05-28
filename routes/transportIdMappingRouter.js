var express = require('express');
var router = express.Router();
var transportIdMapping=  require('../v1/controllers/transportIdMappingController');
var auth = require('../auth');
router.get("/:id",transportIdMapping.getById);
router.post("/",transportIdMapping.insert);
router.get("/",transportIdMapping.findAll);

module.exports = router;