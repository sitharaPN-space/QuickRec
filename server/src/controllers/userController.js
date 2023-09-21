import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserDao from "../data-access/User.dao.js";
import UserModel from "../models/UserModel.js";

export const signup = async (req, res) => {
  const {
    userName,
    email,
    mobileNo,
    password,
    IsBoardEmployee,
    empNumber,
    nic,
  } = req.body;
  try {
    const olduser = await UserDao.getUserByEmail(email);

    if (olduser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await UserModel.create({
      UserName: userName,
      Password: hashedPassword,
      EmailAddress: email,
      MobileNo: mobileNo,
      EmpNumber: empNumber,
      NIC: nic,
      IsEmployee: IsBoardEmployee,
    });

    const token = jwt.sign(
      { email: result.EmailAddress, id: result._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).json({ result, token });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signin = async (req, res) => {
  const { userName, password, admin } = req.body;

  try {
    const oldUser = await UserDao.getUserByEmail(userName, admin);

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });
    const { UserName, EmailAddress, UserId } = oldUser.dataValues;

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.Password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { EmailAddress, UserName, UserId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: oldUser, token });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
};
