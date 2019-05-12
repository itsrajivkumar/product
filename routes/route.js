var express = require('express');
var appRouter = express.Router();
var indexRouter = require('../routes/index');
var productRouter=require('../routes/productRouter');

appRouter.use('/', indexRouter);
appRouter.use("/product",productRouter);
module.exports = appRouter;