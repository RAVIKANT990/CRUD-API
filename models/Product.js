const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 




const Products = sequelize.define("products", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,  
        primaryKey: true,     
      },
   name: {
     type: DataTypes.STRING,
     allowNull: false
   },
   description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'products', 
  timestamps: false,   
});



module.exports = Products;
