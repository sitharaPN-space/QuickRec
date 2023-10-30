export const getAllBoardGrades = async (req) => {
  try {
    const queryString = `SELECT boardGradeId value, boardGrade text FROM BoardGrades`;
    const results = await req.app.locals.db.query(queryString);
    return results.recordset;
  } catch (e) {
    console.log(e);
    throw Error();
  }
};

export const getAllSalaryGroups = async (req) => {
  try {
    const queryString = `SELECT SalaryGroupId value, salaryGroup text FROM SalaryGroups`;
    const results = await req.app.locals.db.query(queryString);
    return results.recordset;
  } catch (e) {
    console.log(e);
    throw Error();
  }
};

export const getAllDashboardData = async (req) => {
  try {
    const queryString = `
    SELECT
    (SELECT COUNT(VacancyId) FROM Vacancies WHERE Status = 'ACT') AS NoOfActiveVacancies,
    (SELECT COUNT(ApplicationId) FROM Applications WHERE Status = 'PENDING') AS NoOfPendingApplications
    `;
    const results = await req.app.locals.db.query(queryString);
    return results.recordset[0];
  } catch (e) {
    console.log(e);
    throw Error();
  }
};
