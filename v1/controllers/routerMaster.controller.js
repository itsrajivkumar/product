var response = require('../../responses/response');
var model = require('../models');
var sequelize = require('../models/index');
/*
   **   To  perform  the operation regarding  fileRepository
   **
*/

module.exports = {
    insert: async (req, res) => {
        console.log("Going to insert the router Master ");
        try {
            var result = await model.tbl_routeMaster.create({
                routeName: req.body.routerName
            });
            if (result.dataValues.routeId > 0) {
                console.log("save route Master with id", result.dataValues.routeId);
                response.result(result.dataValues, res);
            }

        } catch (err) {
            response.dataErrors(err, res);
        }

    },

    findAll: async (req, res) => {
        console.log("get all  the data from router Master tbl");
        try {
            var result = await model.tbl_routeMaster.findAll({
                order: [
                    ['routeId', 'ASC'],
                ]
            });
            response.result(result, res);
        } catch (err) {
            response.dataErrors(err, res);
        }
    },
    getId: async (req, res) => {
        console.log("get ID  the data from router Master tbl");
        try {
            var result = await model.tbl_routeMaster.findAll({
                where: { routeId: req.params.id }
            })
            response.result(result, res);
        } catch (err) {
            response.dataErrors(err, res);
        }
    },
    update: async (req, res) => {
        console.log("update  the data from routerMaster tbl");
        try {
            var result = await model.tbl_routeMaster.update({
                routeName: req.body.routeName
            },
                {
                    where:
                        { routeId: req.params.id }
                }
            )
            response.result(result, res);
        } catch (err) {
            response.dataErrors(err, res);
        }
    },


}


