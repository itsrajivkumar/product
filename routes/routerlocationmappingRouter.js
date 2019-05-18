var express = require('express');
var router = express.Router();
var routerlocationMapping =  require('../v1/controllers/routerLocationMapping.controller');
var auth = require('../auth');
router.post("/",routerlocationMapping.insert);
router.get("/",routerlocationMapping.findAll);
module.exports = router;