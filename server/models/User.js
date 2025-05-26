const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
        firstName: {
        type: DataTypes.STRING,
        allowNull: true,
        },
        lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        },
        password: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        role: {
        type: DataTypes.ENUM('Admin', 'School Administrator', 'Guard', 'Teacher', 'Student', 'Parent'),
        allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true, 
            unique: true,
            validate: {
                isEmail: true,
            }
        },
     
    }, {
   
      timestamps: true,
    });
  
    return User;
  };
  