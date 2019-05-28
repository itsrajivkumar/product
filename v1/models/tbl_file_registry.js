'use strict';
var fileRegistry = require('../modelsobject/tbl_file_registry.object');

module.exports = (sequelize, DataTypes) => {
    const tbl_file_registry = sequelize.define('tbl_file_registry', fileRegistry.fileRegistryObj);
    return tbl_file_registry;
};