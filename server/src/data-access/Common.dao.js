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
    (SELECT COUNT(VacancyId) FROM Vacancies WHERE Status = 'PENDING') AS NoOfPendingVacancies,
    (SELECT COUNT(ApplicationId) FROM Applications WHERE Status = 'PENDING') AS NoOfPendingApplications
    `;
    const results = await req.app.locals.db.query(queryString);
    return results.recordset[0];
  } catch (e) {
    console.log(e);
    throw Error();
  }
};

export const getUpcomingInterviews = async (req) => {
  try {
    const results = await req.app.locals.db.query(`
    SELECT VacancyName,PlannedInterViewDate FROM Vacancies WHERE PlannedInterViewDate > GETDATE() ORDER BY PlannedInterViewDate ASC
    `);
    return results.recordset;
  } catch (error) {
    console.log(error);
    throw Error();
  }
};

export const getDashboardChartData = async (req) => {
  try {
    const results = await req.app.locals.db.query(`
    SELECT
    FORMAT(AppliedDate,'MMM') AS month,
    SUM(CASE WHEN status = 'SELECTED' THEN 1 ELSE 0 END) AS selected,
    SUM(CASE WHEN status = 'REJECTED' THEN 1 ELSE 0 END) AS rejected
    FROM Applications
    GROUP BY FORMAT(AppliedDate,'MMM')
    ORDER BY MIN(AppliedDate)
    `);
    return results.recordset;
  } catch (error) {
    console.log(error);
    throw Error();
  }
};
