var sequelize = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');
/*
   **
   **  transport_id_mapping  model  to  store the obj  into the db.
   **
   */
module.exports = {
    transportIdMappingObj: {
        transport_mapping_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        process_name: {
            type: DataTypes.STRING(50)
        },
        application_name: {
            type: DataTypes.STRING(50)
        },
        source_data_name: {
            type: DataTypes.STRING(50)
        }
    }

}