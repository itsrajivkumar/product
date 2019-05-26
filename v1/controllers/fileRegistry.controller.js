var response = require('../../responses/response');
var model = require('../models');
var sequelize = require('../models/index');
var rabbitMq = require("../../utils/rabbitUtils");
var _ = require('lodash');
var dateFormat = require('dateformat');
/*
 **   To  perform  the operation regarding  fileRepository
 **
 */
var getLastSixMonth = () => {
    let yearArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    let sixMonthArr = [];
    for (let monthCount = 6; monthCount >= 1; monthCount--) {

        var d = new Date();
        d.setMonth(d.getMonth() - monthCount);
        let month = d.getMonth();
        let year = d.getFullYear();

        sixMonthArr.push(year + "-" + yearArr[month]);
    }

    return sixMonthArr;
}
module.exports = {
    getById: async (req, res) => {
        var result = {};
        try {
            var fileRegistry = await model.tbl_fileRegistry.findAll({
                where: {
                    fileRegistryId: req.params.id
                }
            });

            response.result(fileRegistry, res);
        } catch (err) {
            console.log(err);
            response.dataErrors(err, res);
        }
    },

    insert: (req, res) => {
        console.log("Going to published  the file Repository ");
        //publish the data in rabbit mq   
        try {
            var data = JSON.stringify(req.body);
            rabbitMq.publishser(data, process.env.FILE_REGISTRY_RABBIT_QUEUE);
            response.result(req.body, res);
        } catch (err) {
            response.dataErrors(err, res);
        }

    },

    findAll: async (req, res) => {
        console.log("get all  the data from fileRegistry tbl");
        try {
            var result = await model.tbl_fileRegistry.findAll({})
            response.result(result, res);
        } catch (err) {
            response.dataErrors(err, res);
        }
    },

    getCreatedAtByMonth: async (req, res) => {

        try {

            let sixMonthArr = getLastSixMonth();
            let successArr = [];
            let failedArr = [];
            let inprogressArr = [];
            let totalArr = [];
           
            for (var cnt = 0; cnt < sixMonthArr.length; cnt++) {                
                var yearMonth = sixMonthArr[cnt];
                console.log("yearMonthyearMonthyearMonth",yearMonth);
                /*************Set the color on the base of location id By Rajiv */
                // var tempObj = await model.sequelize.query(`select 1 as type, "fileRegistryId" as id, "locationId","transportId",status,"processTimeStamp" from "tbl_fileRegistries" as f where "transportId"='${transportId}' 
                // UNION ALL select 2,"transportlogId" as id,"locationId","transportId",status,"processTimeStamp" from "tbl_transportLogs" as t where "transportId"='${transportId}'  
                // UNION ALL select  3,"boomiLogId" as id, "locationId","transportId",status,"processTimeStamp" from "tbl_boomiLogs" as t where "transportId"='${transportId}'
                // `,  { type: model.sequelize.QueryTypes.SELECT });
                /*************Set the color on the base of location id By Rajiv */

                var fileRegistry = await model.sequelize.query(`select * from "tbl_fileRegistries" 
            where to_char("createdAt", 'YYYY-MM')='${yearMonth}'`, {
                    type: model.sequelize.QueryTypes.SELECT
                });
                let inProcesscount = 0;
                let successcount = 0;
                let failurecount = 0;
                let totalcount = 0;
                for (var index = 0; index < fileRegistry.length; index++) {
                    /*************Set the count for the day Rajiv */
                    let transportId = fileRegistry[index].transportId;
                    var routeDataMapping = await model.tbl_routerLocationMapping.findAll({
                        where: {
                            routerId: fileRegistry[index].routeId
                        }
                    });
                    var route = [];
                    for (var count = 0; count < routeDataMapping.length; count++) {
                        var locations = await model.tbl_location.findByPk(routeDataMapping[count].locationId);
                        route.push(locations.dataValues);
                    }

                    var tempObj = await model.sequelize.query(`select 1 as type, "fileRegistryId" as id, "locationId","transportId",status,"processTimeStamp" from "tbl_fileRegistries" as f where "transportId"='${transportId}' 
             UNION ALL select 2,"transportlogId" as id,"locationId","transportId",status,"processTimeStamp" from "tbl_transportLogs" as t where "transportId"='${transportId}'  
             UNION ALL select  3,"boomiLogId" as id, "locationId","transportId",status,"processTimeStamp" from "tbl_boomiLogs" as t where "transportId"='${transportId}'
             `, {
                        type: model.sequelize.QueryTypes.SELECT
                    });
                    let status = 0;
                    let timepstamp = 0;

                    for (var count = 0; count < route.length; count++) {
                        var locationStatus = _.find(tempObj, {
                            locationId: route[count].locationId
                        });
                        if (locationStatus) {
                            if (status != 2)
                                status = locationStatus.status;
                            timepstamp = locationStatus.processTimeStamp;
                        } else {
                            console.log("Location NOt Found", locationStatus);
                            if (status != 2)
                                status = 0;

                            route[count].status = 0;
                        }
                    }
                    if (status == 0) {
                        inProcesscount++;
                    } else if (status == 1) {
                        successcount++;
                    } else if (status == 2) {
                        failurecount++;
                    }
                    totalcount++;

                }
                /********************************************** */
                              
                successArr.push(successcount);
                failedArr.push(failurecount);
                inprogressArr.push(inProcesscount);
                totalArr.push(totalcount);
            }
            var msg = {};
            msg["totalArr"] = totalArr;
            msg["successArr"] = successArr;
            msg["failedArr"] = failedArr;
            msg["inprogressArr"] = inprogressArr; 
            response.result(msg, res);
        } catch (err) {
            console.log(err);
            response.dataErrors(err, res);
        }
    },

    getByCreatedAt: async (req, res) => {
        console.log("get count from fileRegistry tbl");

        try {


            var dateArr = new Date().toISOString().split("T");
            var date = dateArr[0];
            /*************Set the color on the base of location id By Rajiv */
            // var tempObj = await model.sequelize.query(`select 1 as type, "fileRegistryId" as id, "locationId","transportId",status,"processTimeStamp" from "tbl_fileRegistries" as f where "transportId"='${transportId}' 
            // UNION ALL select 2,"transportlogId" as id,"locationId","transportId",status,"processTimeStamp" from "tbl_transportLogs" as t where "transportId"='${transportId}'  
            // UNION ALL select  3,"boomiLogId" as id, "locationId","transportId",status,"processTimeStamp" from "tbl_boomiLogs" as t where "transportId"='${transportId}'
            // `,  { type: model.sequelize.QueryTypes.SELECT });
            /*************Set the color on the base of location id By Rajiv */

            console.log(date);
            var fileRegistry = await model.sequelize.query(`select * from "tbl_fileRegistries" 
            where date("createdAt")='${date}'`, {
                type: model.sequelize.QueryTypes.SELECT
            });
            let inProcesscount = 0;
            let successcount = 0;
            let failurecount = 0;
            let totalcount = 0;
            for (var index = 0; index < fileRegistry.length; index++) {
                /*************Set the count for the day Rajiv */
                let transportId = fileRegistry[index].transportId;
                var routeDataMapping = await model.tbl_routerLocationMapping.findAll({
                    where: {
                        routerId: fileRegistry[index].routeId
                    }
                });
                var route = [];
                for (var count = 0; count < routeDataMapping.length; count++) {
                    var locations = await model.tbl_location.findByPk(routeDataMapping[count].locationId);
                    route.push(locations.dataValues);
                }

                var tempObj = await model.sequelize.query(`select 1 as type, "fileRegistryId" as id, "locationId","transportId",status,"processTimeStamp" from "tbl_fileRegistries" as f where "transportId"='${transportId}' 
             UNION ALL select 2,"transportlogId" as id,"locationId","transportId",status,"processTimeStamp" from "tbl_transportLogs" as t where "transportId"='${transportId}'  
             UNION ALL select  3,"boomiLogId" as id, "locationId","transportId",status,"processTimeStamp" from "tbl_boomiLogs" as t where "transportId"='${transportId}'
             `, {
                    type: model.sequelize.QueryTypes.SELECT
                });
                let status = 0;
                let timepstamp = 0;

                for (var count = 0; count < route.length; count++) {
                    var locationStatus = _.find(tempObj, {
                        locationId: route[count].locationId
                    });
                    if (locationStatus) {
                        if (status != 2)
                            status = locationStatus.status;
                        timepstamp = locationStatus.processTimeStamp;
                    } else {
                        console.log("Location NOt Found", locationStatus);
                        if (status != 2)
                            status = 0;

                        route[count].status = 0;
                    }
                }
                if (status == 0) {
                    inProcesscount++;
                } else if (status == 1) {
                    successcount++;
                } else if (status == 2) {
                    failurecount++;
                }
                totalcount++;

            }
            /********************************************** */
            var msg = {};
            msg["count"] = totalcount;
            msg["successcount"] = successcount;
            msg["failurecount"] = failurecount;
            msg["inProcesscount"] = inProcesscount;

            response.result(msg, res);
        } catch (err) {
            console.log(err);
            response.dataErrors(err, res);
        }
    }
}