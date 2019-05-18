var express = require('express');
var appRouter = express.Router();
var indexRouter = require('../routes/index');
var productRouter=require('../routes/productRouter');
var fileRepositoryRouter=require('../routes/fileRepositoryRouter');
var transportLogRouter=require('../routes/transportLogRouter');
var boomiLogRouter=require('../routes/boomiLogRouter');
var usersRouter=require('../routes/usersRouter');
var routeMasterRouter=require('../routes/routeMasterRouter');
var locationRouter=require('../routes/locationRouter');
var routerlocationmappingRouter=require('../routes/routerlocationmappingRouter');

appRouter.use('/', indexRouter);
appRouter.use("/product",productRouter);
appRouter.use("/fileRepository",fileRepositoryRouter);
appRouter.use("/transportLog",transportLogRouter);
appRouter.use("/boomiLog",boomiLogRouter);
appRouter.use("/users",usersRouter);
appRouter.use("/routeMaster",routeMasterRouter);
appRouter.use("/locations",locationRouter);
appRouter.use("/routerlocationMapping",routerlocationmappingRouter);

module.exports = appRouter;