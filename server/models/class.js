const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Class = sequelize.define("Class", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Foreign key to link class to a school
    schoolId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Schools',
        key: 'id',
      }
    },
    // Foreign key to link class to an academic cycle (optional, depending on schema design)
    cycleId: {
        type: DataTypes.INTEGER,
        allowNull: true, // Or false if a class must belong to a cycle
        // references: { model: 'Cycles', key: 'id' } // Assuming a Cycle model exists
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    roomNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    }
  }, {
    timestamps: true,
  });

//   Class.associate = (models) => {
//     Class.belongsTo(models.School, { foreignKey: 'schoolId' });
//     // Class.belongsTo(models.Cycle, { foreignKey: 'cycleId' }); // If Cycle model exists
//     Class.hasMany(models.Student, { foreignKey: 'classId' });
//     Class.belongsToMany(models.Subject, { through: 'ClassSubject' }); // Many-to-many with Subjects
//     Class.hasMany(models.Schedule, { foreignKey: 'classId' });
//     Class.hasMany(models.TextbookProgress, { foreignKey: 'classId' });
//   };

  return Class;
};
