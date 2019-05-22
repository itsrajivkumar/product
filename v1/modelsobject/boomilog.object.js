var sequelize = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');
/*
   **
   **  boomiLog  model  to  store the obj  into the db.
   **
   */
module.exports = {
    boomiLogObj: {
        boomiLogId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        transportId: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        processId: {
            type: DataTypes.STRING(20)
        },
        locationId: {
            type: DataTypes.INTEGER          
        },
        status: {
            type: DataTypes.INTEGER
        },
        processTimeStamp: {
            type: DataTypes.BIGINT            
        },
        remarks: {
            type: DataTypes.STRING(50)
        }
    }

}