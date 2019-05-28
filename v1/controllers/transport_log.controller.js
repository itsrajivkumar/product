var response = require('../../responses/response');
var model = require('../models');
var sequelize = require('../models/index');
module.exports = {
    insert: async (req, res) => {
        console.log("Going to insert  the transport_log ");
        var tranportLog = req.body;
        try {
            var data = JSON.stringify(req.body);
            rabbitMq.publishser(data, process.env.TRANSPORT_LOG_QUEUE);
            response.result(req.body, res);
            let obj = {};
            obj["error"] = 0;
            obj["message"] = "success";
            obj["result"] = req.body;
            response.result(obj, res);

            // var result = await model.tbl_transport_log.create({
            //     transport_id: tranportLog.transportId,
            //     timestamp: tranportLog.timestamp,
            //     file_name: tranportLog.fileName,
            //     hash_value:tranportLog.hashValue,
            //     status:tranportLog.status,                
            //     remarks:tranportLog.remarks
            // });
            // if (result.dataValues.transport_log_id > 0) {
            //     console.log("save transportIdMapping with id", result.dataValues.transport_log_id);
            //     let obj = {};
            //     obj["error"] = 0;
            //     obj["message"] = "success";
            //     obj["transportLogId"] = result.dataValues.transport_log_id;
            //     response.result(obj, res);
            // } else {
            //     console.log("Unable to save the data on tbl_file_registry");
            //     let obj = {};
            //     obj["error"] = 0;
            //     obj["message"] = "fail";
            //     obj["transportLogId"] = 0;
            //     response.result(obj, res);
            // }
        } catch (err) {
            console.log(err);
            response.dataErrors(err, res);
        }

    },
    getById: async (req, res) => {
        var result = {};
        try {
            var result = await model.tbl_transport_log.findByPk(req.params.id);
            let obj = {};
            obj["error"] = 0;
            obj["message"] = "success";
            obj["result"] = result;
            response.result(obj, res);

        } catch (err) {
            console.log(err);
            response.dataErrors(err, res);
        }
    },
    findAll: async (req, res) => {
        console.log("get all  the data from tbl_transportLog  ");
        try {
            var result = await model.tbl_transport_log.findAll({
                order: [
                    ['transport_log_id', 'DESC'],
                ]
            });
            let obj = {};
            obj["error"] = 0;
            obj["message"] = "success";
            obj["result"] = result;
            response.result(obj, res);
        } catch (err) {
            response.dataErrors(err, res);
        }
    },

}