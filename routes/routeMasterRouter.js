var express = require('express');
var router = express.Router();
var routeMaster=  require('../v1/controllers/routerMaster.controller');
var auth = require('../auth');
router.post("/",routeMaster.insert);
router.get("/",routeMaster.findAll);
router.get("/:id",routeMaster.getId);
router.put("/:id",routeMaster.update);
module.exports = router;