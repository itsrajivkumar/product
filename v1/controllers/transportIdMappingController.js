var response = require('../../responses/response');
var model = require('../models');
var sequelize = require('../models/index');
module.exports = {
    insert: async (req, res) => {
        console.log("Going to insert  the tbl_transport_id_mapping ");
        var transportIdMapping = req.body;
        try {
            var result = await model.tbl_transport_id_mapping.create({
                process_name: transportIdMapping.processName,
                application_name: transportIdMapping.applicationName,
                source_data_name: transportIdMapping.sourceDataName
            });
            if (result.dataValues.transport_mapping_id > 0) {
                console.log("save transportIdMapping with id", result.dataValues.transport_mapping_id);
                let obj = {};
                obj["error"] = 0;
                obj["message"] = "success";
                obj["transportMappingId"] = result.dataValues.transport_mapping_id;
                response.result(obj, res);
            } else {
                console.log("Unable to save the data on tbl_file_registry");
                let obj = {};
                obj["error"] = 0;
                obj["message"] = "fail";
                obj["transportMappingId"] = 0;
                response.result(obj, res);
            }
        } catch (err) {
            console.log(err);
            response.dataErrors(err, res);
        }

    },
    getById: async (req, res) => {
        var result = {};
        try {
            var result = await model.tbl_transport_id_mapping.findByPk(req.params.id);
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
        console.log("get all  the data from tbl_transport_id_mapping  ");
        try {
            var result = await model.tbl_transport_id_mapping.findAll({
                order: [
                    ['transport_mapping_id', 'DESC'],
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