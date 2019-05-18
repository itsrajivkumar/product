'use strict';
var users = require('../modelsobject/users.object');

module.exports = (sequelize, DataTypes) => {
    const tbl_users = sequelize.define('tbl_users', users.usersObj);
       return tbl_users;
};