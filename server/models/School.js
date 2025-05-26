const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const School = sequelize.define("School", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isEmail: true,
        }
    },
    website:{
        type: DataTypes.STRING,
    }, 
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },

  }, {
    timestamps: true,
  });

  
  return School;
};
