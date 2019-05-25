var response = require('../../responses/response');
var model = require('../models');
var sequelize = require('../models/index');
var rabbitMq = require("../../utils/rabbitUtils");
var dateFormat = require('dateformat');
/*
   **   To  perform  the operation regarding  fileRepository
   **
*/

module.exports = {

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

    getByCreatedAt: async (req, res) => {
        console.log("get count from fileRegistry tbl");
        try {
            var count = 0;
            var successcount = 0;
            var failurecount = 0;
            var inProcesscount = 0;
            var date = new Date().toISOString().split("T");
            console.log(date);
            var result = await model.tbl_fileRegistry.findAll({});
            for (var index = 0; index < result.length; index++) {
                var fileRegistry = result[index];
                var date1 = dateFormat(fileRegistry.createdAt, "yyyy-mm-dd");
                if (date1 == date[0]) {
                    count = count + 1;
                    if (fileRegistry.status == 2) {
                        successcount = successcount + 1;
                    } else if (fileRegistry.status == 1) {
                        inProcesscount = inProcesscount + 1;
                    } else if (fileRegistry.status == 0) {
                        failurecount = failurecount + 1;
                    }
                }
            }
            var msg = {};
            msg["count"] = count;
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


