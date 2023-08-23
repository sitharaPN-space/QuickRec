import { Model, DataTypes } from "sequelize";
import sequelize from "../../db-connect-seq.js";

class SalaryGroup extends Model {}

SalaryGroup.init(
  {
    SalaryGroupId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    SalaryGroup: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "SalaryGroups",
  }
);

export default SalaryGroup;
