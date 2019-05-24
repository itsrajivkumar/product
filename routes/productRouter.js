var express = require('express');
var router = express.Router();
var product=  require('../v1/controllers/product.controller');
var auth = require('../auth');
router.post("/",product.insert);
router.get("/",product.findAll);
module.exports = router;