const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Transportation = sequelize.define("Transportation", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    routeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },  
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Staff',
        key: 'id',
      }
    },
    schoolId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Schools',
            key: 'id',
        }
    },
    vehicleInfo: {
        type: DataTypes.STRING,
        allowNull: true,
    }
  }, {
    timestamps: true,
  });

//   Transportation.associate = (models) => {
//     Transportation.belongsTo(models.Staff, { foreignKey: 'driverId' });
//     Transportation.belongsTo(models.School, { foreignKey: 'schoolId' });
//     // Many-to-many association with Students (for accompaniments/passengers)
//     Transportation.belongsToMany(models.Student, { through: 'StudentTransportation' });
//     // Add association for Accompaniments if it's a separate model
//   };

  return Transportation;
};
