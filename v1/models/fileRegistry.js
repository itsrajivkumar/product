'use strict';
var fileRegistry = require('../modelsobject/file_registry.object');

module.exports = (sequelize, DataTypes) => {
    const tbl_fileRegistry = sequelize.define('tbl_fileRegistry', fileRegistry.fileRegistryObj);
       return tbl_fileRegistry;
};