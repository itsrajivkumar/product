var express = require('express');
var router = express.Router();
var fileRegistry=  require('../v1/controllers/fileRegistry.controller');
var auth = require('../auth');
router.post("/",fileRegistry.insert);
router.get("/",fileRegistry.findAll);
//router.get("/test",fileRegistry.statusByTransportIdRouteId);
module.exports = router;