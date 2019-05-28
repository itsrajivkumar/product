var sequelize = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');
/*
   **
   **  tbl_file_registory  model  to  store the obj  into the db.
   **
   */
module.exports = {
    fileRegistryObj: {
        file_registry_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        transport_id :{
            type: DataTypes.INTEGER,      
            unique: true,
            allowNull: false 
        },
        process_id: {
            type: DataTypes.INTEGER,
        },
        process_name: {
            type: DataTypes.STRING(20)
        },       
        application_name: {
            type: DataTypes.STRING(20)
        },

        source_data_name: {
            type: DataTypes.STRING(50)
        },
        source_data_type: {
            type: DataTypes.STRING(10)
        },
        source_data_encryption_type: {
            type: DataTypes.STRING(20)
        },
        source_data_encryption_password: {
            type: DataTypes.STRING(50)
        },
        source_data_encryption_private_key_file_name: {
            type: DataTypes.STRING(50)
        },
        source_data_encryption_public_key_file_name: {
            type: DataTypes.STRING(50)
        },
        source_data_hash_program: {
            type: DataTypes.STRING(50)
        },
        output_data_name: {
            type: DataTypes.STRING(50)
        },
        output_data_type: {
            type: DataTypes.STRING(10)
        },
        output_data_encyption_type: {
            type: DataTypes.STRING(20)
        },
        output_data_encyption_password: {
            type: DataTypes.STRING(50)
        },
        output_data_encyption_private_key_file_name: {
            type: DataTypes.STRING(50)
        },
        output_data_encyption_public_key_file_name: {
            type: DataTypes.STRING(50)
        },
        output_data_hash_program: {
            type: DataTypes.STRING(50)
        },
        transform_out_data: {
            type: DataTypes.STRING(3)
        },
        process_owner: {
            type: DataTypes.STRING(20)
        },
        route_id: {
            type: DataTypes.STRING(50)
        },
        location_id: {
            type: DataTypes.INTEGER          
        },
        status: {
            type: DataTypes.INTEGER
        },
        process_timestamp: {
            type: DataTypes.BIGINT          
        } ,
        remarks: {
            type: DataTypes.STRING(255)
        }

    }

}