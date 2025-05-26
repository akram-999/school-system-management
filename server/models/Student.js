const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Student = sequelize.define("Student", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // Foreign key to link student to a user account
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      }
    },
    // Foreign key to link student to a school
    schoolId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Schools',
        key: 'id',
      }
    },
    classId: {
        type: DataTypes.INTEGER,
        allowNull: true, // Student might not be assigned to a class initially
        references: {
            model: 'Classes',
            key: 'id',
        }
    },
    gender: {
        type: DataTypes.ENUM('male', 'female'),
        allowNull: false,
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    }
  }, {
    timestamps: true,
  });

//   Student.associate = (models) => {
//     Student.belongsTo(models.User, { foreignKey: 'userId' });
//     Student.belongsTo(models.School, { foreignKey: 'schoolId' });
//     Student.belongsTo(models.Class, { foreignKey: 'classId' });
//     Student.hasMany(models.Schedule, { foreignKey: 'studentId' });
//     Student.hasMany(models.Attendance, { foreignKey: 'studentId' });
//     Student.belongsToMany(models.Parent, { through: 'StudentParent' }); // Many-to-many with Parents
//     Student.belongsToMany(models.Transportation, { through: 'StudentTransportation' }); // Many-to-many with Transportation
//     Student.belongsToMany(models.Homework, { through: 'StudentHomework', foreignKey: 'studentId' }); // Track completion
//     Student.belongsToMany(models.Exam, { through: 'StudentExam', foreignKey: 'studentId' }); // Store grades
//     Student.belongsToMany(models.Activity, { through: 'StudentActivity' }); // Many-to-many with Activities
//   };

  return Student;
};
