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
    } catch (e) {
      console.log(e);
      throw new Error(`Couldn't find user`);
    }
  }

  static async getUserByName(userName) {
    try {
      const user = await UserModel.findOne({
        where: { UserName: `${userName}` },
      });
      return user;
    } catch (error) {
      console.log(e);
      throw new Error(`Couldn't find user`);
    }
  }

  static async getUserByEmail(email) {
    try {
      const user = await UserModel.findOne({
        where: { EmailAddress: `${email}` },
      });
      return user;
    } catch (error) {
      console.log(e);
      throw new Error(`Couldn't find user`);
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
      console.log(e);
      throw new Error(`Couldn't find user`);
    }
  }
}

export default UserDao;
