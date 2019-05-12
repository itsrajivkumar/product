'use strict';
var product = require('../modelsobject/product.object');

module.exports = (sequelize, DataTypes) => {
    const tbl_product = sequelize.define('tbl_product', product.productObj);
   
    return tbl_product;
};