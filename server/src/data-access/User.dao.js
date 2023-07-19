import UserModel from "../models/UserModel.js";
import { Op } from "sequelize";

class UserDao {
  static async createUser(userData) {
    try {
      const user = await UserModel.create(userData);
      return user;
    } catch (error) {
      throw new Error("Failed to create user");
    }
  }

  static async getUserById(userId) {
    try {
      const user = await UserModel.findByPk(userId);
      // Additional business logic or data manipulation if needed
      return user;
    } catch (e) {
      console.log(e);
      //throw new Error("Failed to retrieve user");
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
    }
  }

  static async getUserByEmail(email) {
    try {
      const user = await UserModel.findOne({
        where: { EmailAddress: `${email}` },
      });
      return user;
    } catch (error) {
      console.log(error);
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
    }
  }
}

export default UserDao;
