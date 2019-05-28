'use strict';
var transportLog = require('../modelsobject/tbl_tranport_log.object');

module.exports = (sequelize, DataTypes) => {
    const tbl_transport_log = sequelize.define('tbl_transport_log', transportLog.transportLogObj);
    return tbl_transport_log;
};