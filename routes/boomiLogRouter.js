var express = require('express');
var router = express.Router();
var boomiLog=  require('../v1/controllers/boomi.controller');
var auth = require('../auth');
router.get("/:id",boomiLog.getById);
router.post("/",boomiLog.insert);
router.get("/",boomiLog.findAll);
module.exports = router;