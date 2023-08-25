import Application from "../models/Application.js";
import BasicDetails from "../models/BasicDetails.js";
import { updateOrCreate } from "./Basic.dao.js";

const getApplicationsByVacancy = async (req) => {
  const { vacancyId } = req.query;

  try {
    const results = await req.app.locals.db.query(
      `SELECT Applications.ApplicationId,VacancyName,NameWithInitials,MobileNo1,AppliedDate
      FROM Applications 
      INNER JOIN ApplicationBasicDetails abd ON abd.ApplicationId = Applications.ApplicationId
      INNER JOIN Vacancies v ON v.VacancyId = Applications.VacancyId
      ${vacancyId ? `WHERE Applications.VacancyId='${vacancyId}'` : ""}`
    );

    return results.recordsets[0];
  } catch (error) {
    console.log(error);
  }
};

const getExistingApplication = async (applicationId) => {
  try {
    const application = await Application.findOne({
      where: { ApplicationId: applicationId },
    });
    return application;
  } catch (e) {
    console.log(e);
  }
};

const createOrUpadateApplication = async (applicationReq) => {
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

const createBasicDetails = async (basicDetailsReq) => {
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

const getApplicationBasicDetails = async (req) => {
  const { applicationId } = req.query;

  try {
    const results = await req.app.locals.db.query(
      `SELECT title, nameWithInitials,nameDenotedbyInit,otherName,nic,dateOfBirth,
      sex,civilStatus,religion,addressLine1,addressLine2,nationality,ethnicity,mobileNo1,mobileNo2,email
      FROM ApplicationBasicDetails  
      WHERE ApplicationId = ${applicationId}`
    );

    return results.recordset[0];
  } catch (error) {
    console.log(error);
  }
};

export {
  createBasicDetails,
  createOrUpadateApplication,
  getApplicationsByVacancy,
  getExistingApplication,
  getApplicationBasicDetails,
};
