var sequelize = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');
/*
   **
   **  tbl_transport_log  model  to  store the obj  into the db.
   **
   */
module.exports = {
    transportLogObj: {
        transport_log_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        transport_id: {
            type: DataTypes.INTEGER
        },
        timestamp : {
            type: DataTypes.BIGINT
        },
        file_name: {
            type: DataTypes.STRING(50)
        },
        hash_value: {
            type: DataTypes.STRING(50)
        },
        status: {
            type: DataTypes.INTEGER
        },
        remarks: {
            type: DataTypes.TEXT
        }
    }

}