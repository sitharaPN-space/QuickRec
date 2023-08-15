import Vacancy from "../models/Vacancy.js";
import { updateOrCreate } from "./Basic.dao.js";
import sql from "mssql";
import { application } from "express";

const createOrUpadateVacancy = async (vacancyReq, req) => {
  try {
    const vacancy = await updateOrCreate(Vacancy, {}, vacancyReq);
    return vacancy.item;
  } catch (error) {
    console.log(error);
  }
};

const getVacanciesBySearch = async (req) => {
  const { searchQuery } = req.query;
  try {
    const results = await req.app.locals.db.query(
      `select * from Vacancies where lower(VacancyName) like '%${searchQuery}%'`
    );

    return results.recordset;
  } catch (error) {
    console.error(error);
    return { message: "Failed data retrieval", error };
  }
};

export { createOrUpadateVacancy, getVacanciesBySearch };
