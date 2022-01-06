module.exports = (sequelize, DataTypes) => {
  const Subjects = sequelize.define("Subjects", {
    subjectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Subjects.associate = (models) => {
    Subjects.hasMany(models.Quizes, {
      onDelete: "cascade",
    });
  };

  return Subjects;
};
