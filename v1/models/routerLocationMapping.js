'use strict';
var routerLocationMapping = require('../modelsobject/routerLocationMapping.object');

module.exports = (sequelize, DataTypes) => {
    const tbl_routerLocationMapping = sequelize.define('tbl_routerLocationMapping', routerLocationMapping.routerLocationMappingObj);
    
       return tbl_routerLocationMapping;
};