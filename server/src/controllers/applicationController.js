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

export const getAppDetails = async (req, res) => {
  try {
    let data = {};
    data.basicDetails = await ApplicationDAO.getApplicationBasicDetails(req);
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
