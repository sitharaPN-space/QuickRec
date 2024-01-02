import UserModel from "../models/UserModel.js";
import { Op, literal } from "sequelize";
import UserRole from "../models/UserRoles.js";

class UserDao {
  static async createUser(userData) {
    try {
      const user = await UserModel.create(userData);
      return user;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create user");
    }
  }

  static async getUserById(userId) {
    try {
      const user = await UserModel.findByPk(userId);
      return user;
    } catch (error) {
      console.log(error);
      throw Error();
    }
  }

  static async getUserByEmpNoNRole(employeeNo, roles) {
    try {
      let users = await UserModel.findAll({
        where: employeeNo && { EmpNumber: employeeNo },
        attributes: [
          "UserId",
          "UserName",
          "EmpNumber",
          "EmailAddress",
          "MobileNo",
          "NIC",
          [literal("[UserRole].[UserRole]"), "UserRole"],
        ],
        include: [
          {
            model: UserRole,
            attributes: [],
            where: {
              UserRoleId: { [Op.or]: roles },
            },
          },
        ],
        raw: true,
      });

      return users;
    } catch (error) {
      console.log(error);
      throw Error();
    }
  }

  static async getUserByName(userName) {
    try {
      const user = await UserModel.findOne({
        where: { UserName: `${userName}` },
      });
      return user;
    } catch (error) {
      console.log(error);
      throw Error();
    }
  }

  static async getUserByEmailNRole(email, admin, roles) {
    try {
      const user = await UserModel.findOne({
        where: {
          [Op.and]: [
            admin ? { UserRoleId: { [Op.or]: roles } } : "",
            { EmailAddress: `${email}` },
          ],
        },
        attributes: [
          "UserName",
          "EmailAddress",
          "UserId",
          "Password",
          [literal("[UserRole].[UserRole]"), "UserRole"],
          [literal("[UserRole].[Permissions]"), "Permissions"],
        ],
        include: [
          {
            model: UserRole,
            attributes: [],
          },
        ],
        raw: true,
      });
      return user;
    } catch (error) {
      console.log(error);
      throw Error();
    }
  }

  static async getUserByNameOrEmail(userName, EmailAddress) {
    try {
      const user = await UserModel.findAll({
        where: {
          [Op.or]: [
            { UserName: `${userName}` },
            { EmailAddress: `${EmailAddress}` },
          ],
        },
      });
      return user;
    } catch (error) {
      console.log(error);
      throw Error();
    }
  }

  static async updateUserRole(userId, userRoleId) {
    try {
      const user = await UserDao.getUserById(userId);
      user.UserRoleId = userRoleId;
      await user.save();
    } catch (error) {
      console.log(error);
      throw Error();
    }
  }
}

export default UserDao;
