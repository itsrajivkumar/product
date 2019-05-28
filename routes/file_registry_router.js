var express = require('express');
var router = express.Router();
var file_registry=  require('../v1/controllers/file_registry.controller');
var auth = require('../auth');
router.get("/:id",file_registry.getById);
router.post("/",file_registry.insert);
router.get("/",file_registry.findAll);

module.exports = router;