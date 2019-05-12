var sequelize = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');
module.exports = {
    productObj: {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        productsDetails: {
            type: DataTypes.STRING
        }     
       
   }

}