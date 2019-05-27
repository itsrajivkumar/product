var response = require('../../responses/response');
var model = require('../models');
var sequelize = require('../models/index');
var md5 = require('md5');

var rabbitMq = require("../../utils/rabbitUtils");
/*
   **   To  perform  the operation regarding  users tbl
   **
*/

module.exports = {

    insert: async (req, res) => {

        console.log("Going to insert the users tbl ",req.body);
        try {
            var result = await model.tbl_users.create({
                firstname: req.body.firstName,
                lastname: req.body.lastName,
                email: req.body.email,
                password:md5(req.body.password),
                status:req.body.status            
            });
            if (result.dataValues.userId > 0) {
                console.log("save route Master with id", result.dataValues.userId);
                response.result(result.dataValues, res);
            }

        } catch (err) {
            response.dataErrors(err, res);
        }

    },

    findAll: async (req, res) => {
        console.log("get all  the data from users tbl");
        try {
            var result = await model.tbl_users.findAll({
                order: [
                    ['userId', 'DESC'],
                ]
            });
            response.result(result, res);
        } catch (err) {
            response.dataErrors(err, res);
        }
    },

    getUserId: async (req, res) => {
        console.log("get ID  the data from users tbl");
        try {
            var result = await model.tbl_users.findAll({
                where: { userId: req.params.id }
            })
            response.result(result, res);
        } catch (err) {
            response.dataErrors(err, res);
        }
    },
    update: async (req, res) => {
        console.log("update  the data from users tbl");
        try {
            var result = await model.tbl_users.update({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                status:req.body.status              
            },
                {
                    where:
                        { userId: req.params.userId }
                }
            )
            response.result(result, res);
        } catch (err) {
            response.dataErrors(err, res);
        }
    },
    updateStatus: async (req, res) => {
        console.log("update  the data from users tbl");
        try {
            var result = await model.tbl_users.update({                
                status:req.body.status              
            },
                {
                    where:
                        { userId: req.params.userId }
                }
            )
            response.result(result, res);
        } catch (err) {
            response.dataErrors(err, res);
        }
    },

    emailVerification: async (req, res) => {
        console.log("get  the user by email");
        try {
            var result = await model.tbl_users.findAll({
                where: { email: req.params.email }
            })
            response.result(result, res);
        } catch (err) {
            response.dataErrors(err, res);
        }
    },
    login: async (req, res) => {
        console.log("get  the user by email and password");
        try {
            var result = await model.tbl_users.findAll({
                where: {
                    email: req.body.email,
                    password: md5(req.body.password),
                    status:1
                }
            })
            response.result(result, res);
        } catch (err) {
            response.dataErrors(err, res);
        }
    },

    count: async (req, res) => {
        console.log("get the user count");
        try {
            var result = await model.tbl_users.count({});
            response.result(result, res);
        } catch (err) {
            response.dataErrors(err, res);
        }
    }

    
}


