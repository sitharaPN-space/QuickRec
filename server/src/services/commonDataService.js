import {
  getAllBoardGrades,
  getAllSalaryGroups,
  getApplicationSteps,
} from "../data-access/Common.dao.js";

const getMasterData = async (req) => {
  try {
    const boardGrades = await getAllBoardGrades(req);
    const salaryGroups = await getAllSalaryGroups(req);
    const appSteps = await getApplicationSteps(req);
    let data = {};
    data.boardGrades = boardGrades;
    data.salaryGroups = salaryGroups;
    data.appSteps = appSteps;
    return { data };
  } catch (e) {
    console.log(e);
  }
};

export { getMasterData };
