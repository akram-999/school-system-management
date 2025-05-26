const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Staff = sequelize.define("Staff", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    staffType: {
      type: DataTypes.ENUM("Guard", "Teacher", "Driver"),
      allowNull: false,
    },
    // Foreign key to link staff to a user account
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // 'Users' refers to table name
        key: 'id',
      }
    },
    // Foreign key to link staff to a school
    schoolId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Schools', // 'Schools' refers to table name
        key: 'id',
      }
    },
    // Add other relevant staff details like contact info, qualifications etc.
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

//   Staff.associate = (models) => {
//     Staff.belongsTo(models.User, { foreignKey: 'userId' });
//     Staff.belongsTo(models.School, { foreignKey: 'schoolId' });
//     // Add other associations like Transportation for Drivers, Schedules for Teachers, etc.
//     Staff.hasMany(models.Schedule, { foreignKey: 'staffId' });
//     Staff.hasMany(models.Attendance, { foreignKey: 'staffId' });
//     Staff.hasMany(models.Transportation, { foreignKey: 'driverId' }); // Assuming driverId links to Staff id
//     Staff.hasMany(models.TextbookProgress, { foreignKey: 'teacherId' }); // Assuming teacherId links to Staff id
//     Staff.hasMany(models.Exam, { foreignKey: 'teacherId' }); // Assuming teacherId links to Staff id
//     Staff.hasMany(models.Homework, { foreignKey: 'teacherId' }); // Assuming teacherId links to Staff id
//   };

  return Staff;
};
