module.exports = (sequelize, DataTypes) => {
  const Options = sequelize.define("Options", {
    options: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    awnser: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Options;
};
