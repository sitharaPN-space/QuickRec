import {
  getAllBoardGrades,
  getAllDashboardData,
  getAllSalaryGroups,
} from "../data-access/Common.dao.js";

const getMasterData = async (req) => {
  try {
    const boardGrades = await getAllBoardGrades(req);
    const salaryGroups = await getAllSalaryGroups(req);
    const dashboardData = await getAllDashboardData(req);
    return { boardGrades, salaryGroups, dashboardData };
  } catch (e) {
    console.log(e);
    throw Error();
  }
};

export { getMasterData };
