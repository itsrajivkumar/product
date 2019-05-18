var sequelize = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');
/*
   **
   **  routerLocationMapping  model  to  store the obj  into the db.
   **
   */
module.exports = {
    routerLocationMappingObj: {
        routeLocationMappingId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        routerId: {
            type: DataTypes.INTEGER
         
        },
        locationId:{
            type:DataTypes.INTEGER
         
        }
        
    }

}