'use strict';
var routeMaster = require('../modelsobject/routeMaster.object');

module.exports = (sequelize, DataTypes) => {
    const tbl_routeMaster = sequelize.define('tbl_routeMaster', routeMaster.routeMasterObj);
       return tbl_routeMaster;
};