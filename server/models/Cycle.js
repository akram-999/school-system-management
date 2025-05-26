const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Cycle = sequelize.define("Cycle", {
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
            allowNull: false,
            references: {
              model: 'Schools',
              key: 'id',
            }
          }
        }, {
            timestamps: true,
          });
          return Cycle;
};