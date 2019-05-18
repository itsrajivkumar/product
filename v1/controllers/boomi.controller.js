var response = require('../../responses/response');
var model = require('../models');
var sequelize = require('../models/index');

var rabbitMq = require("../../utils/rabbitUtils");
/*
   **   To  perform  the operation regarding  boomiLog
   **
*/

module.exports = {
    insert: (req, res) => {
        console.log("Going to published  the boomiLog ");
        //publish the data in rabbit mq          
        try {
            var data = JSON.stringify(req.body);
            rabbitMq.publishser(data, process.env.BOOMI_LOG_RABBIT_QUEUE);
            response.result(req.body, res);
        } catch (err) {
            response.dataErrors(err, res);
        }

    },

    findAll: async (req, res) => {
        console.log("get all  the data from boomi tbl");     
        try {
            var result = await model.tbl_boomiLog.findAll({})
            response.result(result, res);
        } catch (err) {
            response.dataErrors(err, res);
        }
    },
}


