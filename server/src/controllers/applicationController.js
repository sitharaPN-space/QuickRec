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
    if (!req.userId) return res.json({ message: "Unauthenticated" });

    const dbResult = await ApplicationDAO.createOrUpadateApplication({
      UserId: userId,
      VacancyId: vacancyId,
      Status: ApplicationStatus.PENDING,
    });
    const application = dbResult;

    const basicDetails = await ApplicationDAO.createBasicDetails({
      ApplicationId: application.ApplicationId,
      Title: title,
      NameWithInitials: nameWithInitials,
      NameDenotedbyInit: nameDenotedbyInit,
      OtherName: otherName,
      Nic: nic,
      DateOfBirth: dateOfBirth,
      Sex: sex,
      CivilStatus: civilStatus,
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
