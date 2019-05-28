var response = require('../../responses/response');
var model = require('../models');
var sequelize = require('../models/index');
module.exports = {
    insert: async (req, res) => {
        console.log("Going to insert   the tbl_file_repository ");
        var fileRepositoryObj = req.body;
        try {
            var result = await model.tbl_file_registry.create({
                transport_id: fileRepositoryObj.transportId,
                process_id: fileRepositoryObj.processId,
                process_name: fileRepositoryObj.processName,
                application_name: fileRepositoryObj.applicationName,
                source_data_name: fileRepositoryObj.sourceDataName,
                source_data_type: fileRepositoryObj.sourceDataType,
                source_data_encryption_type: fileRepositoryObj.sourceDataEncryptionType,
                source_data_encryption_password: fileRepositoryObj.sourceDataEncryptionPassword,
                source_data_encryption_private_key_file_name: fileRepositoryObj.sourceDataEncryptionPrivateKeyFileName,
                source_data_encryption_public_key_file_name: fileRepositoryObj.sourceDataEncryptionPublicKeyFileName,
                source_data_hash_program: fileRepositoryObj.sourceDataHashProgram,
                output_data_name: fileRepositoryObj.outputDataName,
                output_data_type: fileRepositoryObj.outputDataType,
                output_data_encyption_type: fileRepositoryObj.outputDataEncyptionType,
                output_data_encyption_password: fileRepositoryObj.outputDataEncyptionPassword,
                output_data_encyption_private_key_file_name: fileRepositoryObj.outputDataEncyptionPrivateKeyFileName,
                output_data_encyption_public_key_file_name: fileRepositoryObj.outputDataEncyptionPublicKeyFileName,
                output_data_hash_program: fileRepositoryObj.outputDataHashProgram,
                transform_out_data: fileRepositoryObj.transformOutData,
                process_owner: fileRepositoryObj.processOwner,
                route_id: fileRepositoryObj.routeId,
                location_id: fileRepositoryObj.locationId,
                status: fileRepositoryObj.status,
                process_timestamp: fileRepositoryObj.processTimeStamp,
                remarks: fileRepositoryObj.remarks

            });
            if (result.dataValues.file_registry_id > 0) {
                console.log("save file Repository with id", result.dataValues.file_registry_id);
                let obj = {};
                obj["error"] = 0;
                obj["message"] = "success";
                obj["fileRegistryId"] = result.dataValues.file_registry_id;
                response.result(obj, res);
            } else {
                console.log("Unable to save the data on tbl_file_registry");
                let obj = {};
                obj["error"] = 0;
                obj["message"] = "fail";
                obj["fileRegistryId"] = 0;
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
            var fileRegistry = await model.tbl_file_registry.findByPk(req.params.id);
            let obj = {};
            obj["error"] = 0;
            obj["message"] = "success";
            obj["result"] = fileRegistry;
            response.result(obj, res);

        } catch (err) {
            console.log(err);
            response.dataErrors(err, res);
        }
    },
    findAll: async (req, res) => {
        console.log("get all  the data from tbl_file_registry  ");
        try {
            var result = await model.tbl_file_registry.findAll({
                order: [
                    ['file_registry_id', 'DESC'],
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