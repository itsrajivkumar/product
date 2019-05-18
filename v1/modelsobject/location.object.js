var sequelize = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');
/*
   **
   **  location  model  to  store the obj  into the db.
   **
   */
module.exports = {
    locationObj: {
        locationId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        locationName: {
            type: DataTypes.STRING(20)
        }
        
    }

}