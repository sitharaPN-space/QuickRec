import { updateOrCreate } from "./Basic.dao.js";

const getAllBoardGrades = async (req) => {
  try {
    const queryString = `SELECT boardGradeId value, boardGrade text FROM BoardGrades`;
    const results = await req.app.locals.db.query(queryString);
    return results.recordset;
  } catch (e) {
    console.log(e);
  }
};

const getAllSalaryGroups = async (req) => {
  try {
    const queryString = `SELECT SalaryGroupId value, salaryGroup text FROM SalaryGroups`;
    const results = await req.app.locals.db.query(queryString);
    return results.recordset;
  } catch (e) {
    console.log(e);
  }
};

const getApplicationSteps = async (req) => {
  try {
    const queryString = `SELECT AppStepId stepNo, AppStep step text FROM ApplicationSteps`;
    const results = await req.app.locals.db.query(queryString);
    return results.recordset;
  } catch (e) {
    console.log(e);
  }
};

export { getAllBoardGrades, getAllSalaryGroups, getApplicationSteps };
