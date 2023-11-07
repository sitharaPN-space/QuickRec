import Vacancy from "../models/Vacancy.js";
import { updateOrCreate } from "./Basic.dao.js";

const createOrUpadateVacancy = async (vacancyReq, req) => {
  try {
    const vacancy = await updateOrCreate(
      Vacancy,
      {
        VacancyId: `${vacancyReq.VacancyId}`,
      },
      vacancyReq
    );
    return vacancy.item;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

const getVacanciesBySearch = async (req) => {
  const { searchQuery } = req.query;
  try {
    const results = await req.app.locals.db.query(
      `SELECT AdvertismentPath,AgeLimit,ClosingDate,NoOfVacancies,
      PlannedInterViewDate,PublishedDate,RecruitmentType,Remarks,SalaryGroup,sg.SalaryGroupId,
      IIF(Status='ACT','Open','Close') Status,VacancyId,BoardGrade,bg.BoardGradeId,
      VacancyName,updatedAt, 
      IIF(DATEDIFF(day,createdAt,GETDATE()) = 0,CONCAT(DATEDIFF(hh,createdAt,GETDATE()), ' hours ago'),
      CONCAT(DATEDIFF(day,createdAt,GETDATE()), ' days ago')) DaysPosted,
      (SELECT count(*) FROM Applications app WHERE app.VacancyId = Vacancies.VacancyId) NoOfApplicants,
      (SELECT count(*) FROM Applications app WHERE app.VacancyId = Vacancies.VacancyId and app.Status = 'PENDING') NoOfPendingApplicants,
      (SELECT count(*) FROM Applications app WHERE app.VacancyId = Vacancies.VacancyId and app.Status = 'REJECTED') NoOfRejectedApplicants,
      (SELECT count(*) FROM Applications app WHERE app.VacancyId = Vacancies.VacancyId and app.Status = 'SELECTED') NoOfSelectedApplicants
      FROM Vacancies
      INNER JOIN BoardGrades bg ON bg.BoardGradeId = Vacancies.BoardGradeId
      INNER JOIN SalaryGroups sg ON sg.SalaryGroupId = Vacancies.SalaryGroupId WHERE lower(VacancyName) like '%${searchQuery}%'
      ORDER BY createdAt desc`
    );

    return results.recordset;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

const getAllVacancies = async (req) => {
  try {
    const results = await req.app.locals.db.query(`
    SELECT AdvertismentPath,AgeLimit,ClosingDate,NoOfVacancies,
    PlannedInterViewDate,PublishedDate,RecruitmentType,Remarks,SalaryGroup,Status,VacancyId,BoardGrade,bg.BoardGradeId,sg.SalaryGroupId,
    VacancyName,updatedAt, 
    IIF(DATEDIFF(day,updatedAt,GETDATE()) = 0,CONCAT(DATEDIFF(hh,updatedAt,GETDATE()), ' hours ago'),
    CONCAT(DATEDIFF(day,updatedAt,GETDATE()), ' days ago')) DaysPosted,
    (SELECT count(*) FROM Applications app WHERE app.VacancyId = Vacancies.VacancyId) NoOfApplicants
    FROM Vacancies
    INNER JOIN BoardGrades bg ON bg.BoardGradeId = Vacancies.BoardGradeId
    INNER JOIN SalaryGroups sg ON sg.SalaryGroupId = Vacancies.SalaryGroupId`);
    return results.recordset;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export { createOrUpadateVacancy, getVacanciesBySearch, getAllVacancies };
