'use strict';
var location = require('../modelsobject/location.object');

module.exports = (sequelize, DataTypes) => {
    const tbl_location = sequelize.define('tbl_location', location.locationObj);
       return tbl_location;
};