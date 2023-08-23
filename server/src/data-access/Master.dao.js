import BoardGrade from "../models/BoardGrade.js";
import SalaryGroup from "../models/SalaryGroup.js";

class MasterDao {
  static async getAllSalaryGroups() {
    try {
      const data = await SalaryGroup.findAll();
      const salaryGroups = data.map(({ SalaryGroupId, SalaryGroup }) => ({
        value: SalaryGroupId,
        text: SalaryGroup,
      }));
      return salaryGroups;
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllBoardGrades() {
    try {
      const data = await BoardGrade.findAll();
      const boardGrades = data.map(({ BoardGradeId, BoardGrade }) => ({
        value: BoardGradeId,
        text: BoardGrade,
      }));
      return boardGrades;
    } catch (error) {
      console.log(error);
    }
  }
}

export default MasterDao;
