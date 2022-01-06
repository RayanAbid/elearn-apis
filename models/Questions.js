module.exports = (sequelize, DataTypes) => {
  const Questions = sequelize.define("Questions", {
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Questions.associate = (models) => {
    Questions.hasMany(models.Options, {
      onDelete: "cascade",
    });
  };

  return Questions;
};
