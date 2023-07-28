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
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const signin = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const oldUser = await UserDao.getUserByEmail(userName);
    const { UserName, EmailAddress, UserId } = oldUser.dataValues;

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.Password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { UserName: UserName, EmailAddress: EmailAddress, id: UserId },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const applicationSubmit = async (req, res) => {
  try {
    throw Error();
  } catch (error) {
    res.status(500).json({ message: "Coming soon ..." });
    console.log(error);
  }
};
