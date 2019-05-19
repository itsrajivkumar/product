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
        try {
            var result = await model.tbl_location.findAll({
                where: { locationId: req.params.id }
            })
            response.result(result, res);
        } catch (err) {
            response.dataErrors(err, res);
        }
    },
    
    findAll: async (req, res) => {
        console.log("get all  the data from fileRegistry,tranportLog,boomiLog  tbl");
        try {
            var result =await  model.sequelize.query("select fr.processId from tbl_fileRegistry as fr",{ type: model.sequelize.QueryTypes.SELECT });
            response.result(result, res);
        } catch (err) {
            console.log(err);
            response.dataErrors(err, res);
        }
    },
   
}


