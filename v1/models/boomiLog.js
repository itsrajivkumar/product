'use strict';
var boomiLog = require('../modelsobject/boomilog.object');

module.exports = (sequelize, DataTypes) => {
    const tbl_boomiLog = sequelize.define('tbl_boomiLog', boomiLog.boomiLogObj);
       return tbl_boomiLog;
};