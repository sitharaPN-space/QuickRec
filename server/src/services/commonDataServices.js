import {
  getAllBoardGrades,
  getAllDashboardData,
  getAllSalaryGroups,
  getDashboardChartData,
  getUpcomingInterviews,
} from "../data-access/Common.dao.js";

const getMasterData = async (req) => {
  try {
    const boardGrades = await getAllBoardGrades(req);
    const salaryGroups = await getAllSalaryGroups(req);
    const dashboardData = await getAllDashboardData(req);
    const upcomingInterviews = await getUpcomingInterviews(req);
    const chartData = await getDashboardChartData(req);
    return {
      boardGrades,
      salaryGroups,
      dashboardData,
      upcomingInterviews,
      chartData,
    };
  } catch (e) {
    console.log(e);
    throw Error();
  }
};

export { getMasterData };
