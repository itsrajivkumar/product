var express = require('express');
var router = express.Router();
var transportLog=  require('../v1/controllers/transportlog.controller');
var auth = require('../auth');
router.post("/",transportLog.insert);
router.get("/",transportLog.findAll);
module.exports = router;