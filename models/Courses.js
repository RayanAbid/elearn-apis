module.exports = (sequelize, DataTypes) => {
  const Courses = sequelize.define("Courses", {
    courseName: {
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

  Courses.associate = (models) => {
    Courses.hasMany(models.Subjects, {
      onDelete: "cascade",
    });
  };

  return Courses;
};
