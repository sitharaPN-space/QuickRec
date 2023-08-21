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
      return user;
    } catch (error) {
      console.log(error);
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

  static async getUserByEmail(email, admin) {
    try {
      const user = await UserModel.findOne({
        where: {
          [Op.and]: [
            { isAdmin: admin ?? { [Op.or]: [true, false] } },
            { EmailAddress: `${email}` },
          ],
        },
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
