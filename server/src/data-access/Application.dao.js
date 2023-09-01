import Application from "../models/Application.js";
import BasicDetails from "../models/BasicDetails.js";
import { updateOrCreate } from "./Basic.dao.js";

export const getApplicationsByVacancy = async (req) => {
  const { vacancyId } = req.query;

  try {
    const results = await req.app.locals.db.query(
      `SELECT ApplicationId,Applications.UserId,VacancyName,NameWithInitials,MobileNo1,AppliedDate
      FROM Applications 
      INNER JOIN ApplicationBasicDetails abd ON abd.UserId = Applications.UserId
      INNER JOIN Vacancies v ON v.VacancyId = Applications.VacancyId
      WHERE Applications.VacancyId=${
        vacancyId === "0" ? "Applications.VacancyId" : vacancyId
      }`
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
  }
};

export const createBasicDetails = async (basicDetailsReq) => {
  try {
    const basicDetails = await updateOrCreate(
      BasicDetails,
      {
        UserId: `${basicDetailsReq?.userId}`,
      },
      basicDetailsReq
    );
    return basicDetails.item;
  } catch (error) {
    console.log(error);
  }
};

export const getApplicationBasicDetails = async (req) => {
  const { userId } = req.query;

  try {
    const results = await req.app.locals.db.query(
      `SELECT basicDetailsId,title, nameWithInitials,nameDenotedbyInit,otherName,nic,dateOfBirth,isChecked AS isApproved,
      sex,civilStatus,religion,addressLine1,addressLine2,nationality,ethnicity,mobileNo1,mobileNo2,email
      FROM ApplicationBasicDetails
      WHERE UserId = ${userId}`
    );

    return results.recordset[0];
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
