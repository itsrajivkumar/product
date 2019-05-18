var sequelize = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');
/*
   **
   **  routeMaster  model  to  store the obj  into the db.
   **
   */
module.exports = {
    routeMasterObj: {
        routeId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        routeName: {
            type: DataTypes.STRING(20)
        }
        
    }

}