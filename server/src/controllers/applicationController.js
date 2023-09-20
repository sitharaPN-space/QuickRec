import * as ApplicationDAO from "../data-access/Application.dao.js";
import { ApplicationStatus } from "../constant/common.js";

export const getApplications = async (req, res) => {
  try {
    const data = await ApplicationDAO.getApplicationsByVacancy(req);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
};

export const addBasicDetails = async (req, res) => {
  const {
    userId,
    vacancyId,
    title,
    nameWithInitials,
    nameDenotedbyInit,
    otherName,
    nic,
    religion,
    dateOfBirth,
    sex,
    civilStatus,
    addressLine1,
    addressLine2,
    nationality,
    ethnicity,
    mobileNo1,
    mobileNo2,
    email,
  } = req.body;

  try {
    await ApplicationDAO.createOrUpadateApplication({
      UserId: userId,
      VacancyId: vacancyId,
      Status: ApplicationStatus.PENDING,
    });

    const basicDetails = await ApplicationDAO.createBasicDetails({
      userId,
      title,
      nameWithInitials,
      nameDenotedbyInit,
      otherName,
      nic,
      religion,
      dateOfBirth,
      sex,
      civilStatus,
      addressLine1,
      addressLine2,
      nationality,
      ethnicity,
      mobileNo1,
      mobileNo2,
      email,
    });

    res.status(200).json({ basicDetails });
  } catch (error) {
    console.log(error);
  }
};

export const addEducation = async (req, res) => {
  try {
    const education = await ApplicationDAO.createEducation(req.body);
    res.status(200).json({ education });
  } catch (error) {
    console.log(error);
  }
};
export const addExperience = async (req, res) => {
  try {
    const experience = await ApplicationDAO.createExperience(req.body);
    res.status(200).json({ experience });
  } catch (error) {
    console.log(error);
  }
};
export const addOtherDetails = async (req, res) => {
  try {
    const otherDetails = await ApplicationDAO.createOtherDetails(req.body);
    res.status(200).json({ otherDetails });
  } catch (error) {
    console.log(error);
  }
};

export const getAppDetails = async (req, res) => {
  try {
    let data = {};
    data.basicDetails = await ApplicationDAO.getApplicationBasicDetails(req);
    data.education = await ApplicationDAO.getApplicationEducation(req);
    data.experience = await ApplicationDAO.getApplicationExperience(req);
    data.otherDetails = await ApplicationDAO.getApplicationOtherDetails(req);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getAppBasicDetails = async (req, res) => {
  try {
    const data = await ApplicationDAO.getApplicationBasicDetails(req);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getAppEducation = async (req, res) => {
  try {
    const data = await ApplicationDAO.getApplicationEducation(req);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getAppExperience = async (req, res) => {
  try {
    const data = await ApplicationDAO.getApplicationExperience(req);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getAppOtherDetails = async (req, res) => {
  try {
    const data = await ApplicationDAO.getApplicationOtherDetails(req);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const approveQualification = async (req, res) => {
  try {
    const data = await ApplicationDAO.ApproveQualification(req);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const reviewApplication = async (req, res) => {
  try {
    const data = await ApplicationDAO.changeApplicationStatus(req);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};
