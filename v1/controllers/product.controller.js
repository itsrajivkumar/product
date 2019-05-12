var response = require('../../responses/response');
var model = require('../models');
var sequelize = require('../models/index');

var rabbitMq = require("../../utils/rabbitUtils")
module.exports = {

    insert: (req, res) => {
        console.log("Going to published  the product");
        //publish the data in rabbit mq   
        try {
            var data = JSON.stringify(req.body);
            rabbitMq.publishser(data);
            response.result(data, res);
        } catch (err) {
            response.dataErrors(err, res);
        }

    },

    findAll: (req, res) => {
        console.log("get all  the data from product tbl");
        return model.tbl_product.findAll({
        }).then(result => {
            response.result(result, res);
        }
            ), error => {
                response.dataErrors(error, res);
            }
    },
}


