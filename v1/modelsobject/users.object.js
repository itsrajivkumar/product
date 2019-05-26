var sequelize = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');
/*
   **
   **  boomiLog  model  to  store the obj  into the db.
   **
   */
module.exports = {
    usersObj: {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        firstname: {
            type: DataTypes.STRING(50)
        },      
        lastname: {
            type: DataTypes.STRING(50)
        },
        email: {
            type: DataTypes.STRING(50)    
        },
        password: {
            type: DataTypes.TEXT
        },
        status:{
            type:DataTypes.INTEGER
        }
    }

}