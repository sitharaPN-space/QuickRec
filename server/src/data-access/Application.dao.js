import Application from "../models/Application.js";
import BasicDetails from "../models/BasicDetails.js";
import EduDetails from "../models/EduDetails.js";
import ExpDetails from "../models/ExpDetails.js";
import AchveDetails from "../models/AchveDetails.js";
import { updateOrCreate } from "./Basic.dao.js";

export const getApplicationsByVacancy = async (req) => {
  const { vacancyId } = req.query;

  try {
    const results = await req.app.locals.db.query(
      `SELECT ApplicationId,Applications.UserId,VacancyName,NameWithInitials,MobileNo1,Applications.Status,AppliedDate
      FROM Applications 
      INNER JOIN ApplicationBasicDetails abd ON abd.UserId = Applications.UserId
      INNER JOIN Vacancies v ON v.VacancyId = Applications.VacancyId
      WHERE Applications.VacancyId=${
        vacancyId === "0" ? "Applications.VacancyId" : vacancyId
      }
      ORDER BY AppliedDate DESC`
    );
    return results.recordset;
  } catch (error) {
    console.log(error);
  }
};

export const createOrUpadateApplication = async (applicationReq) => {
  try {
    const application = await updateOrCreate(
      Application,
      {
        UserId: `${applicationReq?.UserId}`,
        VacancyId: `${applicationReq?.VacancyId}`,
      },
      applicationReq
    );
    return application.item;
  } catch (error) {
    console.log(error);
    throw Error();
  }
};

export const createBasicDetails = async (basicDetailsReq) => {
  try {
    const basicDetails = await updateOrCreate(
      BasicDetails,
      {
        UserId: basicDetailsReq?.userId,
      },
      basicDetailsReq
    );
    return basicDetails.item;
  } catch (error) {
    console.log(error);
  }
};

export const createEducation = async (educationReq) => {
  try {
    const education = await updateOrCreate(
      EduDetails,
      {
        EduDetailsId: educationReq?.eduDetailsId ?? 0,
      },
      educationReq
    );
    return education.item;
  } catch (error) {
    console.log(error);
  }
};

export const createExperience = async (experienceReq) => {
  try {
    const education = await updateOrCreate(
      ExpDetails,
      {
        ExpDetailsId: experienceReq?.expDetailsId ?? 0,
      },
      experienceReq
    );
    return education.item;
  } catch (error) {
    console.log(error);
  }
};

export const createOtherDetails = async (otherDetailsReq) => {
  try {
    const achievement = await updateOrCreate(
      AchveDetails,
      {
        AchvDetailsId: otherDetailsReq?.achvDetailsId ?? 0,
      },
      otherDetailsReq
    );
    return achievement.item;
  } catch (error) {
    console.log(error);
  }
};

export const getApplicationBasicDetails = async (req) => {
  const { userId, applicationId } = req.query;
  const query = `SELECT basicDetailsId,title, nameWithInitials,nameDenotedbyInit,otherName,nic,dateOfBirth,
  sex,civilStatus,religion,addressLine1,addressLine2,nationality,ethnicity,mobileNo1,mobileNo2,email,ISNULL(appAs.isApproved,0) isApproved,Status,Remarks
  FROM ApplicationBasicDetails appB
  LEFT JOIN ApplicationAssesments appAs ON appAs.detailId = BasicDetailsId and appAs.ApplicationId = ${applicationId} and appAs.AppStepId = 1
  INNER JOIN Applications app ON app.ApplicationId = ${applicationId}
  WHERE appB.userId = ${userId}`;

  try {
    const results = applicationId
      ? await req.app.locals.db.query(query)
      : await BasicDetails.findOne({
          where: { userId: `${userId}` },
          attributes: {
            exclude: ["basicDetailsId", "userId", "updatedAt"],
          },
        });

    return applicationId ? results.recordset[0] : results;
  } catch (error) {
    console.log(error);
  }
};

export const getApplicationEducation = async (req) => {
  const { userId, applicationId } = req.query;
  const query = `SELECT eduDetailsId,instituteName,qualification,fieldOfStudy,startDate,endDate,grade,attachmentPath,
  ISNULL(appAs.isApproved,0) isApproved,educationType
  FROM ApplicationEduDetails appEdu
  LEFT JOIN ApplicationAssesments appAs ON appAs.detailId = eduDetailsId and appAs.ApplicationId = ${applicationId} and appAs.AppStepId = 2
  INNER JOIN EducationType ON EducationType.EduTypeId = appEdu.EduTypeId
  WHERE appEdu.userId = ${userId}`;

  try {
    const results = applicationId
      ? await req.app.locals.db.query(query)
      : await EduDetails.findAll({
          where: { userId: `${userId}` },
          attributes: {
            exclude: ["userId", "updatedAt"],
          },
        });

    return results?.recordset ?? results;
  } catch (error) {
    console.log(error);
  }
};

export const getApplicationExperience = async (req) => {
  const { userId, applicationId } = req.query;
  const query = `SELECT expDetailId,title, organization,startDate,endDate,description,attachmentPath,
  ISNULL(appAs.isApproved,0) isApproved
  FROM ApplicationExpDetails appExp
  LEFT JOIN ApplicationAssesments appAs ON appAs.detailId = expDetailId and appAs.ApplicationId = ${applicationId} and appAs.AppStepId = 3
  WHERE appExp.userId = ${userId}`;

  try {
    const results = applicationId
      ? await req.app.locals.db.query(query)
      : await ExpDetails.findAll({
          where: { userId: `${userId}` },
        });

    return results?.recordset ?? results;
  } catch (error) {
    console.log(error);
  }
};

export const getApplicationOtherDetails = async (req) => {
  const { userId, applicationId } = req.query;
  const query = `SELECT achvDetailId,title, organization,startDate,endDate,description,attachmentPath,
  ISNULL(appAs.isApproved,0) isApproved
  FROM ApplicationAchveDetails appAchve
  LEFT JOIN ApplicationAssesments appAs ON appAs.detailId = achvDetailId and appAs.ApplicationId = ${applicationId} and appAs.AppStepId = 4
  WHERE appAchve.userId = ${userId}`;

  try {
    const results = applicationId
      ? await req.app.locals.db.query(query)
      : await AchveDetails.findAll({
          where: { userId: `${userId}` },
        });

    return results?.recordset ?? results;
  } catch (error) {
    console.log(error);
  }
};

export const ApproveQualification = async (req) => {
  const { applicationId, stepId, detailId, isApproved } = req.query;

  try {
    const results = await req.app.locals.db.query(
      `IF EXISTS (SELECT * FROM ApplicationAssesments WHERE ApplicationId = ${applicationId} and AppStepId = ${stepId} and DetailId = ${detailId} ) 
      BEGIN
          UPDATE ApplicationAssesments 
          SET IsApproved = ${isApproved}, UpdatedAt=GETDATE()
          WHERE ApplicationId = ${applicationId} and AppStepId = ${stepId} and DetailId = ${detailId}
      END
      ELSE BEGIN
        INSERT INTO ApplicationAssesments (ApplicationId, AppStepId, DetailId, IsApproved, UpdatedAt)
        VALUES (${applicationId},${stepId},${detailId},${isApproved}, GETDATE())
      END
       `
    );
    return results.recordset;
  } catch (error) {
    console.log(error);
  }
};

export const changeApplicationStatus = async (req) => {
  const { applicationId, status, remarks } = req.query;
  try {
    const results = await req.app.locals.db.query(`
    UPDATE Applications
    SET Status = '${status}', Remarks = '${remarks}'
    WHERE ApplicationId = ${applicationId}
    `);

    return results.recordset;
  } catch (error) {
    console.log(error);
    throw Error();
  }
};
