import { Model, DataTypes } from "sequelize";
import sequelize from "../../db-connect-seq.js";
import {
  ApplicationReviewStatus,
  ApplicationStatus,
} from "../constant/common.js";

class Application extends Model {}

Application.init(
  {
    ApplicationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    VacancyId: {
      type: DataTypes.INTEGER,
    },
    Status: {
      type: DataTypes.ENUM,
      values: [
        ApplicationStatus.PENDING,
        ApplicationStatus.SELECTED,
        ApplicationStatus.REJECTED,
      ],
      defaultValue: ApplicationStatus.PENDING,
    },
    ReviewStatus: {
      type: DataTypes.ENUM,
      values: [
        ApplicationReviewStatus.PENDING,
        ApplicationReviewStatus.APPROVED,
        ApplicationReviewStatus.RECOMMENDED,
      ],
      defaultValue: ApplicationReviewStatus.PENDING,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "Application",
    createdAt: "AppliedDate",
  }
);

export default Application;
