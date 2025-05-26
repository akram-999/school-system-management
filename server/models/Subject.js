const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Subject = sequelize.define("Subject", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    schoolId: {
        type: DataTypes.INTEGER,
        allowNull: true, // Or false if subjects are always school-specific
        references: {
            model: 'Schools',
            key: 'id',
        }
    },
    teacherId:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Users',
            key: 'id',
        }
    }
  }, {
    timestamps: true,
  });

//   Subject.associate = (models) => {
//     Subject.belongsTo(models.School, { foreignKey: 'schoolId' }); // If school-specific
//     Subject.belongsToMany(models.Class, { through: 'ClassSubject' }); // Many-to-many with Classes
//     Subject.hasMany(models.Schedule, { foreignKey: 'subjectId' });
//     Subject.hasMany(models.Homework, { foreignKey: 'subjectId' });
//     Subject.hasMany(models.Exam, { foreignKey: 'subjectId' });
//     Subject.hasMany(models.TextbookProgress, { foreignKey: 'subjectId' });
//   };

  return Subject;
};
