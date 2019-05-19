var response = require('../../responses/response');
var model = require('../models');
var sequelize = require('../models/index');

var rabbitMq = require("../../utils/rabbitUtils");
/*
   **   To  perform  the operation regarding  routerLocationMapping tbl
   **
*/

module.exports = {

    insert: async(req, res) => {
        console.log("Going to insert the routerLocationMapping tbl ");
        try {
            console.log(req.body);
            var result = await model.tbl_routerLocationMapping.create({
                routerId:parseInt(req.body.routerId),
                locationId: parseInt(req.body.locationId)

            });                       
           if (result.dataValues.routeLocationMappingId > 0) {
            console.log("save route Master with id",result.dataValues.routeLocationMappingId);              
             response.result(result, res);
          
            }        
         
        } catch (err) {
            response.dataErrors(err, res);
        }

    },

    findAll: async (req, res) => {
        console.log("get all  the data from location tbl");     
        try {
            var result = await model.tbl_routerLocationMapping.findAll({})
            response.result(result, res);
        } catch (err) {
            response.dataErrors(err, res);
        }
    },
}


