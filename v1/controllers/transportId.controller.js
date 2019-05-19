var response = require('../../responses/response');
var model = require('../models');
var sequelize = require('../models/index');
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
                    }
                });
                result["boomiLog"] = await model.tbl_boomiLog.findAll({
                    where: {
                        transportId: transportId
                    }
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
            var fileRegistry = await model.tbl_fileRegistry.findAll({});
            for (var index = 0; index < fileRegistry.length; index++) {
                var result = {};
                result["fileRegistry"] = fileRegistry[index];
                var transportId = fileRegistry[index].transportId;
                result["transportLog"] = await model.tbl_transportLog.findAll({
                    where: {
                        transportId: transportId
                    }
                });
                result["boomiLog"] = await model.tbl_boomiLog.findAll({
                    where: {
                        transportId: transportId
                    }
                });

                fileRegistryArray.push(result);
            }
            response.result(fileRegistryArray, res);
        } catch (err) {
            console.log(err);
            response.dataErrors(err, res);
        }
    },

}


