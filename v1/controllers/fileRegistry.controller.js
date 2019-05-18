var response = require('../../responses/response');
var model = require('../models');
var sequelize = require('../models/index');

var rabbitMq = require("../../utils/rabbitUtils");
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
}


