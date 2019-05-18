'use strict';
var transportLog = require('../modelsobject/transportslog.object');

module.exports = (sequelize, DataTypes) => {
    const tbl_transportLog = sequelize.define('tbl_transportLog', transportLog.transportlogObj);
       return tbl_transportLog;
};