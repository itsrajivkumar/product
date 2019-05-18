var response = require('../../responses/response');
var model = require('../models');
var sequelize = require('../models/index');
/*
   **   To  perform  the operation regarding  location tbl
   **
*/

module.exports = {

    insert: async (req, res) => {
        console.log("Going to insert the location tbl ");
        try {
            var result = await model.tbl_location.create({
                locationName: req.body.locationName
            });
            if (result.dataValues.locationId > 0) {
                console.log("save route Master with id", result.dataValues.locationId);
                response.result(result.dataValues, res);

            }

        } catch (err) {
            response.dataErrors(err, res);
        }

    },

    findAll: async (req, res) => {
        console.log("get all  the data from location tbl");
        try {
            var result = await model.tbl_location.findAll({
                order: [
                    ['locationId', 'ASC'],
                ]
            })
            response.result(result, res);
        } catch (err) {
            response.dataErrors(err, res);
        }
    },
    getId: async (req, res) => {
        console.log("get ID  the data from location  tbl");
        try {
            var result = await model.tbl_location.findAll({
                where: { locationId: req.params.id }
            })
            response.result(result, res);
        } catch (err) {
            response.dataErrors(err, res);
        }
    },
    update: async (req, res) => {
        console.log("update  the data from location tbl");
        try {
            var result = await model.tbl_location.update({
                locationName: req.body.locationName
            },
                {
                    where:
                        { locationId: req.params.id }
                }
            )
            response.result(result, res);
        } catch (err) {
            response.dataErrors(err, res);
        }
    },
}


