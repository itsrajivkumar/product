var express = require('express');
var router = express.Router();
var users=  require('../v1/controllers/users.controller');
var auth = require('../auth');
router.post("/",users.insert);
router.put("/:userId",users.update);
router.get("/",users.findAll);
router.get("/:id",users.getUserId);

module.exports = router;