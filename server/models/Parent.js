const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Parent = sequelize.define("Parent", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      }
    },
    
    schoolId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
      model: 'Schools',
      key: 'id',
    },
    },
 
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    }
  }, {
    timestamps: true,
  });

//   Parent.associate = (models) => {
//     Parent.belongsTo(models.User, { foreignKey: 'userId' });
//     // Many-to-many association with Students
//     Parent.belongsToMany(models.Student, { through: 'StudentParent' });
//   };

  return Parent;
};
