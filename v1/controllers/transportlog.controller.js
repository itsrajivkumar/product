var response = require('../../responses/response');
var model = require('../models');
var sequelize = require('../models/index');

var rabbitMq = require("../../utils/rabbitUtils");
/*
   **   To  perform  the operation regarding  transport log
   **
*/

module.exports = {
    getById: async (req, res) => {        
        var result = {};
        try {
            var fileRegistry = await model.tbl_transportLog.findAll({
                where: {
                    transportlogId: req.params.id
                }
            });
           
            response.result(fileRegistry, res);
        } catch (err) {
            console.log(err);
            response.dataErrors(err, res);
        }
    },

    insert: (req, res) => {
        console.log("Going to published  the transport log");
        //publish the data in rabbit mq   
        try {
            var data = JSON.stringify(req.body);
            rabbitMq.publishser(data, process.env.TRANSPORT_LOG_RABBIT_QUEUE);
            response.result(req.body, res);
        } catch (err) {
            response.dataErrors(err, res);
        }

    },

    findAll: async (req, res) => {
        console.log("get all  the data from transport log tbl");     
        try {
            var result = await model.tbl_transportLog.findAll({})
            response.result(result, res);
        } catch (err) {
            response.dataErrors(err, res);
        }
    },
}


