import * as ApplicationDAO from "../data-access/Application.dao.js";
import { ApplicationStatus } from "../constant/common.js";

export const getApplications = async (req, res) => {
  try {
    const data = await ApplicationDAO.getApplicationsByVacancy(req);
    res.status(200).json({ data });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const submitAppication = async (req, res) => {
  const { userId, vacancyId } = req.body;
  try {
    await ApplicationDAO.createOrUpadateApplication({
      UserId: userId,
      VacancyId: vacancyId,
    });
    res
      .status(200)
      .json({ data: { message: "Application Submited Successsfully" } });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const addBasicDetails = async (req, res) => {
  try {
    const basicDetails = await ApplicationDAO.createBasicDetails(req.body);
    res.status(200).json({ basicDetails });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const addEducation = async (req, res) => {
  try {
    const education = await ApplicationDAO.createEducation(req.body);
    res.status(200).json({ education });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const addExperience = async (req, res) => {
  try {
    const experience = await ApplicationDAO.createExperience(req.body);
    res.status(200).json({ experience });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const addOtherDetails = async (req, res) => {
  try {
    const otherDetails = await ApplicationDAO.createOtherDetails(req.body);
    res.status(200).json({ otherDetails });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
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
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAppBasicDetails = async (req, res) => {
  try {
    const data = await ApplicationDAO.getApplicationBasicDetails(req);
    res.status(200).json({ data });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAppEducation = async (req, res) => {
  try {
    const data = await ApplicationDAO.getApplicationEducation(req);
    res.status(200).json({ data });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAppExperience = async (req, res) => {
  try {
    const data = await ApplicationDAO.getApplicationExperience(req);
    res.status(200).json({ data });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAppOtherDetails = async (req, res) => {
  try {
    const data = await ApplicationDAO.getApplicationOtherDetails(req);
    res.status(200).json({ data });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteAppEduDetail = async (req, res) => {
  try {
    const data = await ApplicationDAO.deleteEducation(req);
    res.status(200).json({ data });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteAppExpDetail = async (req, res) => {
  try {
    const data = await ApplicationDAO.deleteExperience(req);
    res.status(200).json({ data });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteAppOtherDetail = async (req, res) => {
  try {
    const data = await ApplicationDAO.deleteAchievement(req);
    res.status(200).json({ data });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const approveQualification = async (req, res) => {
  try {
    const data = await ApplicationDAO.ApproveQualification(req);
    res.status(200).json({ data });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const reviewApplication = async (req, res) => {
  try {
    const data = await ApplicationDAO.finaliseApplication(req);
    res.status(200).json({ data });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
};
