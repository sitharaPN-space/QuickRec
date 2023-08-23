import { Model, DataTypes } from "sequelize";
import sequelize from "../../db-connect-seq.js";

class BoardGrade extends Model {}

BoardGrade.init(
  {
    BoardGradeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    BoardGrade: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "BoardGrades",
  }
);

export default BoardGrade;
