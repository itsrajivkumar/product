var sequelize = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');
/*
   **
   **  TransportLogs  model  to  store the obj  into the db.
   **
   */
module.exports = {
    transportlogObj: {
        transportlogId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        processId: {
            type: DataTypes.STRING(50)
        },
        processName: {
            type: DataTypes.STRING(20)
        },

        applicationName: {
            type: DataTypes.STRING(20)
        },

        sourceDataName: {
            type: DataTypes.STRING(50)
        },

        sourceDataType: {
            type: DataTypes.STRING(10)
        },
        sourceDataEncryptionType: {
            type: DataTypes.STRING(20)
        },
        sourceDataEncryptionPassword: {
            type: DataTypes.STRING(50)
        },
        sourceDataEncryptionPrivateKeyFileName: {
            type: DataTypes.STRING(50)
        },
        sourceDataEncryptionPublicKeyFileName: {
            type: DataTypes.STRING(50)
        },
        sourceDataHashProgram: {
            type: DataTypes.STRING(50)
        },
        outputDataName: {
            type: DataTypes.STRING(50)
        },
        outputDataType: {
            type: DataTypes.STRING(10)
        },
        outputDataEncyptionType: {
            type: DataTypes.STRING(20)
        },
        outputDataEncyptionPassword: {
            type: DataTypes.STRING(50)
        },
        outputDataEncyptionPrivateKeyFileName: {
            type: DataTypes.STRING(50)
        },
        outputDataEncyptionPublicKeyFileName: {
            type: DataTypes.STRING(50)
        },
        outputDataHashProgram: {
            type: DataTypes.STRING(50)
        },
        transformOutData: {
            type: DataTypes.STRING(3)
        },
        processOwner: {
            type: DataTypes.STRING(20)
        },      
        status: {
            type: DataTypes.INTEGER
        },
        processTimeStamp: {
            type: DataTypes.DATE(6),
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP(6)'),
        }      

    }

}