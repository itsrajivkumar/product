'use strict';
var transport_id_mapping = require('../modelsobject/transport_id_mapping.object');

module.exports = (sequelize, DataTypes) => {
    const tbl_transport_id_mapping = sequelize.define('tbl_transport_id_mapping', transport_id_mapping.transportIdMappingObj);
    return tbl_transport_id_mapping;
};