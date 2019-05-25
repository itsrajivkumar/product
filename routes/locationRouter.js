var express = require('express');
var router = express.Router();
var location =  require('../v1/controllers/location.controller');
var auth = require('../auth');
router.post("/",location.insert);
router.get("/",location.findAll);
router.get("/:id",location.getId);
router.put("/:id",location.update);
module.exports = router;