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
    const olduser = await UserDao.getUserByEmail(req);

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
      UserRoleId: 1,
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
    console.log("user request " + req);
    const oldUser = await UserDao.getUserByEmail(req);

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });
    const { UserName, EmailAddress, UserId, UserRole } = oldUser;

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.Password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      {
        EmailAddress,
        UserName,
        UserId,
        UserRole,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 1200, // 60 seconds
      }
    );

    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const getEmployees = async (req, res) => {
  const { employeeNo, admin } = req.query;
  try {
    const userRole = admin === "true" ? [3, 4] : [2];
    const user = await UserDao.getUserByEmpNoNRole(employeeNo, userRole);
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const changeUserRole = async (req, res) => {
  const { userId, userRoleId } = req.query;
  try {
    await UserDao.updateUserRole(userId, userRoleId);
    res.status(200).json({ message: "Role updated successfully" });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const changePassword = async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;
  try {
    const user = await UserDao.getUserById(userId);
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.Password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.Password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password changed successfully" });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
};
