var express = require('express');
var appRouter = express.Router();
var indexRouter = require('../routes/index');
var productRouter = require('../routes/productRouter');
var fileRepositoryRouter = require('../routes/fileRepositoryRouter');
var transportLogRouter = require('../routes/transportLogRouter');
var boomiLogRouter = require('../routes/boomiLogRouter');
var usersRouter = require('../routes/usersRouter');
var routeMasterRouter = require('../routes/routeMasterRouter');
var locationRouter = require('../routes/locationRouter');
var routerlocationmappingRouter = require('../routes/routerlocationmappingRouter');
var transportIdRouter = require('../routes/transportIdRouter');
var dashboardRouter = require('../routes/dashboardRouter');
var file_registry = require('../routes/file_registry_router');
var transportIdMapping = require('../routes/transportIdMappingRouter');
var transport_log = require('../routes/transport_log_Router');
appRouter.use('/', indexRouter);
appRouter.use("/product", productRouter);
appRouter.use("/fileRepository", fileRepositoryRouter);
appRouter.use("/transportLog", transportLogRouter);
appRouter.use("/boomiLog", boomiLogRouter);
appRouter.use("/users", usersRouter);
appRouter.use("/routeMaster", routeMasterRouter);
appRouter.use("/locations", locationRouter);
appRouter.use("/routerlocationMapping", routerlocationmappingRouter);
appRouter.use("/transportId", transportIdRouter);
appRouter.use("/dashboard", dashboardRouter);
appRouter.use("/fileregistries", file_registry);
appRouter.use("/transportidmappings", transportIdMapping);
appRouter.use("/transportlogs", transport_log);

module.exports = appRouter;