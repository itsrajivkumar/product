var response = require('../../responses/response');
var model = require('../models');
var sequelize = require('../models/index');
var _ = require('lodash');
/*
   **   To  perform  the operation regarding  tansportId 
   **
*/

module.exports = {
    getId: async (req, res) => {
        console.log("get ID  the data from fileRegistry,tranportLog,boomiLog  tbl");
        var result = {};
        try {
            var fileRegistry = await model.tbl_fileRegistry.findAll({
                where: {
                    transportId: req.params.id
                }
            });
            if (fileRegistry.length > 0) {
                result["fileRegistry"] = fileRegistry[0].dataValues;
                var transportId = fileRegistry[0].dataValues.transportId;
                result["transportLog"] = await model.tbl_transportLog.findAll({
                    where: {
                        transportId: transportId
                    },
                    order: [
                        ['transportlogId', 'DESC'],
                    ]
                });
                result["boomiLog"] = await model.tbl_boomiLog.findAll({
                    where: {
                        transportId: transportId
                    },
                    order: [
                        ['boomiLogId', 'DESC'],
                    ]
                });
            }
            response.result(result, res);
        } catch (err) {
            console.log(err);
            response.dataErrors(err, res);
        }
    },
    findAll: async (req, res) => {
        console.log("get all  the data from fileRegistry,tranportLog,boomiLog  tbl");
        var fileRegistryArray = [];
        try {
            var fileRegistry = await model.tbl_fileRegistry.findAll({
                order: [
                    ['fileRegistryId', 'DESC'],
                ]
            });
            console.log("xxxxxxxxxxxxxxxxx",fileRegistry.length)
            for (var index = 0; index < fileRegistry.length; index++) {
                var result = {};
                result["fileRegistry"] = fileRegistry[index];
                var transportId = fileRegistry[index].transportId;
                result["transportLog"] = await model.tbl_transportLog.findAll({
                    where: {
                        transportId: transportId
                    },
                    order: [
                        ['transportlogId', 'DESC'],
                    ]
                });
                result["boomiLog"] = await model.tbl_boomiLog.findAll({
                    where: {
                        transportId: transportId
                    },
                    order: [
                        ['boomiLogId', 'DESC'],
                    ]
                });
                var routeDataMapping = await model.tbl_routerLocationMapping.findAll({
                    where: { routerId: fileRegistry[index].routeId }
                });            
                var route = [];
                for (var count = 0; count < routeDataMapping.length; count++) {
                   var locations = await model.tbl_location.findByPk(routeDataMapping[count].locationId);
                    route.push(locations.dataValues); 
                }

                /*************Set the color on the base of location id By Rajiv */
                var tempObj = await model.sequelize.query(`select "locationId","transportId",status,"processTimeStamp" from "tbl_fileRegistries" as f where "transportId"='${transportId}}' 
    UNION ALL select "locationId","transportId",status,"processTimeStamp" from "tbl_transportLogs" as t where "transportId"='${transportId}'  
    UNION ALL select "locationId","transportId",status,"processTimeStamp" from "tbl_boomiLogs" as t where "transportId"='${transportId}'
    `,  { type: model.sequelize.QueryTypes.SELECT });
                let status=0;
                let timepstamp=0;
                for (var count = 0; count < route.length; count++) {
                    var locationStatus = _.find(tempObj, {locationId: route[count].locationId});
                    if(locationStatus){
                        console.log("Location Found");
                        // 0 -disabled , 1-success , 2 - Failed for location button
                        route[count].status = locationStatus.status;

                        status = locationStatus.status;
                        timepstamp = locationStatus.processTimeStamp;
                    }
                    else{
                        console.log("Location NOt Found");
                        if(status!=2)
                            status=0;

                        route[count].status = 0;                
                    }
                 }
                 /********************************************** */
                
                result["route"] = route;
                result["status"] = status;
                result["lastTimeStamp"] = timepstamp;
                //var status = await statusByTransportId();
                fileRegistryArray.push(result);
            }          
            response.result(fileRegistryArray, res);
        } catch (err) {
            console.log(err);
            response.dataErrors(err, res);
        }
    },

}


