import Application from "../models/Application.js";
import BasicDetails from "../models/BasicDetails.js";
import EduDetails from "../models/EduDetails.js";
import ExpDetails from "../models/ExpDetails.js";
import AchvDetails from "../models/AchveDetails.js";
import { updateOrCreate } from "./Basic.dao.js";

const getExistingApplication = async (applicationId) => {
  try {
    const application = await Application.findOne({
      where: { ApplicationId: `${applicationId}` },
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
  const { userId } = req.query;
  try {
    const queryString = `SELECT title, nameWithInitials,nameDenotedbyInit,otherName,nic,dateOfBirth,
      sex,civilStatus,religion,addressLine1,addressLine2,nationality,ethnicity,mobileNo1,mobileNo2,email
      FROM ApplicationBasicDetails  
      WHERE userId = ${userId}`;

    const results = await req.app.locals.db.query(queryString);
    return results.recordset[0];
  } catch (error) {
    console.log(error);
  }
};

const getApplicationEduDetails = async (req) => {
  const { userId } = req.query;
  try {
    const results = await req.app.locals.db.query(
      `SELECT eduDetailsId,UserId,qualification,instituteName,fieldOfStudy,startDate,endDate,
      grade,attachmentPath, EducationType.educationType,ApplicationEduDetails.eduTypeId  FROM ApplicationEduDetails  
      INNER JOIN EducationType ON EducationType.EduTypeId = ApplicationEduDetails.EduTypeId
      WHERE userId = ${userId}`
    );
    return results.recordset;
  } catch (error) {
    console.log(error);
  }
};

const getApplicationExpDetails = async (req) => {
  const { userId } = req.query;
  try {
    const results = await req.app.locals.db.query(
      `SELECT expDetailId,userId,title,organization,startDate,endDate,
      description,attachmentPath FROM ApplicationExpDetails  
      WHERE userId = ${userId}`
    );
    return results.recordset;
  } catch (error) {
    console.log(error);
  }
};

const getApplicationAchvDetails = async (req) => {
  const { userId } = req.query;
  try {
    const results = await req.app.locals.db.query(
      `SELECT achvDetailId,userId,title,organization,startDate,endDate,
      description,attachmentPath FROM ApplicationAchveDetails  
      WHERE userId = ${userId}`
    );
    return results.recordset;
  } catch (error) {
    console.log(error);
  }
};

const createEduDetails = async (eduDetailsReq) => {
  const {
    eduDetailsId,
    userId,
    attachmentPath,
    eduTypeId,
    endDate,
    fieldOfStudy,
    grade,
    instituteName,
    qualification,
    startDate,
  } = eduDetailsReq;
  try {
    const eduDetails = await updateOrCreate(
      EduDetails,
      {
        EduDetailsId: `${eduDetailsReq?.eduDetailsId}`,
      },
      {
        userId,
        attachmentPath,
        eduTypeId,
        endDate,
        fieldOfStudy,
        grade,
        instituteName,
        qualification,
        startDate,
      }
    );
    return eduDetails.item;
  } catch (error) {
    console.log(error);
  }
};

const deleteEduDetails = async (param) => {
  try {
    await EduDetails.destroy({
      where: {
        EduDetailsId: `${param.eduId}`,
      },
    });
    return { message: "delete success" };
  } catch (error) {
    console.log(error);
  }
};

const deleteExpDetails = async (param) => {
  try {
    await ExpDetails.destroy({
      where: {
        expDetailId: `${param.eduId}`,
      },
    });
    return { message: "delete success" };
  } catch (error) {
    console.log(error);
  }
};

const deleteAchvDetails = async (param) => {
  try {
    await AchvDetails.destroy({
      where: {
        achvDetailId: `${param.eduId}`,
      },
    });
    return { message: "delete success" };
  } catch (error) {
    console.log(error);
  }
};

const createExpDetails = async (expDetailReq) => {
  try {
    const expDetails = await updateOrCreate(
      ExpDetails,
      {
        expDetailId: `${expDetailReq?.expDetailId}`,
      },
      {
        userId: expDetailReq.userId,
        title: expDetailReq.title,
        organization: expDetailReq.organization,
        startDate: expDetailReq.startDate,
        endDate: expDetailReq.endDate,
        description: expDetailReq.description,
        attachmentPath: expDetailReq.attachmentPath,
      }
    );
    return expDetails.item;
  } catch (error) {
    console.log(error);
  }
};

const createAchveDetails = async (achvDetailReq) => {
  try {
    const achvDetails = await updateOrCreate(
      AchvDetails,
      {
        achvDetailId: `${achvDetailReq?.achvDetailId}`,
      },
      {
        userId: achvDetailReq.userId,
        title: achvDetailReq.title,
        organization: achvDetailReq.organization,
        startDate: achvDetailReq.startDate,
        endDate: achvDetailReq.endDate,
        description: achvDetailReq.description,
        attachmentPath: achvDetailReq.attachmentPath,
      }
    );
    return achvDetails.item;
  } catch (error) {
    console.log(error);
  }
};

export {
  createBasicDetails,
  createOrUpadateApplication,
  getExistingApplication,
  getApplicationBasicDetails,
  getApplicationEduDetails,
  createEduDetails,
  deleteEduDetails,
  createExpDetails,
  createAchveDetails,
  getApplicationAchvDetails,
  getApplicationExpDetails,
  deleteExpDetails,
  deleteAchvDetails,
};
