import SalaryGroup from "../models/SalaryGroup.js";
import BoardGrade from "../models/BoardGrade.js";

class MasterDao {
  static async getMasterData() {
    try {
      const salaryGroupsData = await SalaryGroup.findAll();
      const salaryGroups = salaryGroupsData.map(
        ({ dataValues: { SalaryGroupId, SalaryGroup } }) => ({
          value: SalaryGroupId,
          text: SalaryGroup,
        })
      );
      const boardGradesData = await BoardGrade.findAll();

      const boardGrades = boardGradesData.map(
        ({ dataValues: { BoardGradeId, BoardGrade } }) => ({
          value: BoardGradeId,
          text: BoardGrade,
        })
      );
      return { salaryGroups, boardGrades };
    } catch (error) {
      console.log(error);
    }
  }
}

export default MasterDao;
