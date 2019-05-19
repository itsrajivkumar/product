var express = require('express');
var router = express.Router();
var transportId=  require('../v1/controllers/transportId.controller');
var auth = require('../auth');
router.get("/:id",transportId.getId);
router.get("/",transportId.findAll);
module.exports = router;