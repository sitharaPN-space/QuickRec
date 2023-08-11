import Application from "../models/Application.js";
import BasicDetails from "../models/BasicDetails.js";
import { Op } from "sequelize";
import { application } from "express";
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
        ApplicationId: `${basicDetailsReq?.ApplicationId}`,
      },
      basicDetailsReq
    );
    return basicDetails.item;
  } catch (error) {
    console.log(error);
  }
};

export {
  createBasicDetails,
  createOrUpadateApplication,
  getExistingApplication,
};
