import BasicDetails from "../models/BasicDetails.js";
import Application from "../models/Application.js";
import * as ApplicationDAO from "../data-access/Application.dao.js";
import { ApplicationStatus } from "../constant/common.js";

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
    AddressLine1,
    AddressLine2,
    nationality,
    ethnicity,
    mobileNo1,
    mobileNo2,
    email,
  } = req.body;

  try {
    // get existing appliation
    // if (!req.userId) return res.json({ message: "Unauthenticated" });

    const dbResult = await ApplicationDAO.createOrUpadateApplication({
      UserId: userId,
      VacancyId: vacancyId,
      Status: ApplicationStatus.PENDING,
    });
    const application = dbResult;

    const basicDetails = await ApplicationDAO.createBasicDetails({
      userId: userId,
      Title: title,
      NameWithInitials: nameWithInitials,
      NameDenotedbyInit: nameDenotedbyInit,
      OtherName: otherName,
      NIC: nic,
      DateOfBirth: dateOfBirth,
      Sex: sex,
      CivilStatus: civilStatus,
      Religion: religion,
      AddressLine1: AddressLine1,
      AddressLine2: AddressLine2,
      Nationality: nationality,
      Ethnicity: ethnicity,
      MobileNo1: mobileNo1,
      MobileNo2: mobileNo2,
      Email: email,
    });

    res.status(200).json({ basicDetails });
  } catch (error) {
    console.log(error);
  }
};

export const getBasicDetails = async (req, res) => {
  try {
    const data = await ApplicationDAO.getApplicationBasicDetails(req);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getEduDetails = async (req, res) => {
  try {
    const data = await ApplicationDAO.getApplicationEduDetails(req);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const addEduDetails = async (req, res) => {
  try {
    const data = await ApplicationDAO.createEduDetails(req.body);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const deleteEduDetails = async (req, res) => {
  try {
    const data = await ApplicationDAO.deleteEduDetails(req.query);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const addExpDetails = async (req, res) => {
  try {
    const data = await ApplicationDAO.createExpDetails(req.body);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const addAchvDetails = async (req, res) => {
  try {
    const data = await ApplicationDAO.createAchveDetails(req.body);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getExpDetails = async (req, res) => {
  try {
    const data = await ApplicationDAO.getApplicationExpDetails(req);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const deleteExpDetails = async (req, res) => {
  try {
    const data = await ApplicationDAO.deleteExpDetails(req.query);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getAchvDetails = async (req, res) => {
  try {
    const data = await ApplicationDAO.getApplicationAchvDetails(req);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const deleteAchvDetails = async (req, res) => {
  try {
    const data = await ApplicationDAO.deleteAchvDetails(req.query);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Something went wrong" });
  }
};
