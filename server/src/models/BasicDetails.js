import { Model, DataTypes } from "sequelize";
import sequelize from "../../db-connect-seq.js";

class BasicDetails extends Model {}

BasicDetails.init(
  {
    basicDetailsId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nameWithInitials: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nameDenotedbyInit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otherName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    civilStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    religion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressLine1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressLine2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ethnicity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobileNo1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobileNo2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ApplicationBasicDetails",
    timestamps: true,
  }
);

export default BasicDetails;
