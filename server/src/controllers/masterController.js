import MasterDao from "../data-access/Master.dao.js";

export const SalaryGroups = async (req, res) => {
  try {
    const salaryGroups = await MasterDao.getAllSalaryGroups();
    res.status(201).json(salaryGroups);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const BoardGrades = async (req, res) => {
  try {
    const boardGrades = await MasterDao.getAllBoardGrades();
    res.status(201).json(boardGrades);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
