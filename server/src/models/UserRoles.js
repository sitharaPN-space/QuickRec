import { Model, DataTypes } from "sequelize";
import sequelize from "../../db-connect-seq.js";

class UserRole extends Model {}

UserRole.init(
  {
    UserRoleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserRole: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Permissions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "UserRoles",
    timestamps: false,
  }
);

export default UserRole;
