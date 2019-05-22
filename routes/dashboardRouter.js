var express = require('express');
var router = express.Router();
var user=  require('../v1/controllers/users.controller');
var fileRegistry=  require('../v1/controllers/fileRegistry.controller');
var auth = require('../auth');
router.get("/usercount",user.count);
router.get("/fileRegcount",fileRegistry.getByCreatedAt);
module.exports = router;