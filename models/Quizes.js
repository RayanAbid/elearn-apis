module.exports = (sequelize, DataTypes) => {
  const Quizes = sequelize.define("Quizes", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quizTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Quizes.associate = (models) => {
    Quizes.hasMany(models.Questions, {
      onDelete: "cascade",
    });
    Quizes.hasMany(models.Options, {
      onDelete: "cascade",
    });
  };
  return Quizes;
};
