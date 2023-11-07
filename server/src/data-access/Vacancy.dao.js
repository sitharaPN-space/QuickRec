import Vacancy from "../models/Vacancy.js";
import { updateOrCreate } from "./Basic.dao.js";

export const createOrUpadateVacancy = async (vacancyReq, req) => {
  try {
    const vacancy = await updateOrCreate(
      Vacancy,
      {
        VacancyId: vacancyReq.VacancyId ?? 0,
      },
      vacancyReq
    );

    return vacancy;
  } catch (error) {
    console.log(error);
    throw Error();
  }
};

export const deleteVacancy = async (vacancyId) => {
  try {
    await Vacancy.destroy({
      where: {
        VacancyId: vacancyId,
      },
    });
  } catch (error) {
    console.log(error);
    throw Error();
  }
};

export const getVacanciesBySearch = async (req) => {
  const { searchQuery } = req.query;
  try {
    const results = await req.app.locals.db.query(
      `SELECT AdvertismentPath,AgeLimit,ClosingDate,NoOfVacancies,
      PlannedInterViewDate,PublishedDate,RecruitmentType,Remarks,SalaryGroup,Vacancies.Status,Vacancies.VacancyId,BoardGrade,Vacancies.BoardGradeId,Vacancies.SalaryGroupId,
      VacancyName,Vacancies.updatedAt, 
      IIF(DATEDIFF(day,Vacancies.createdAt,GETDATE()) = 0,CONCAT(DATEDIFF(hh,Vacancies.createdAt,GETDATE()), ' hours ago'),
      CONCAT(DATEDIFF(day,Vacancies.createdAt,GETDATE()), ' days ago')) DaysPosted,
      IIF(DATEDIFF(day,GETDATE(),ClosingDate) < 0,'',
      CONCAT(DATEDIFF(day,GETDATE(),ClosingDate), ' days left')) DaysLeft,
      (SELECT COUNT(ApplicationId) FROM Applications WHERE Applications.VacancyId = Vacancies.VacancyId) AS NoOfApplicants,
      (SELECT COUNT(ApplicationId) FROM Applications WHERE Applications.VacancyId = Vacancies.VacancyId AND Applications.Status = 'SELECTED')  AS NoOfSelectedApplicants,
      (SELECT COUNT(ApplicationId) FROM Applications WHERE Applications.VacancyId = Vacancies.VacancyId AND Applications.Status = 'REJECTED')  AS NoOfRejectedApplicants,
      (SELECT COUNT(ApplicationId) FROM Applications WHERE Applications.VacancyId = Vacancies.VacancyId AND Applications.Status = 'PENDING')  AS NoOfPendingApplicants
      FROM Vacancies
      INNER JOIN BoardGrades bg ON bg.BoardGradeId = Vacancies.BoardGradeId
      INNER JOIN SalaryGroups sg ON sg.SalaryGroupId = Vacancies.SalaryGroupId WHERE lower(VacancyName) like '%${searchQuery}%'
      ORDER BY createdAt DESC`
    );
    return results.recordset;
  } catch (error) {
    console.log(error);
    throw Error();
  }
};
