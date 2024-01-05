import * as VacancyDao from "../data-access/Vacancy.dao.js";
import { ActiveStatus, RecruitementType } from "../constant/common.js";

export const createVacancy = async (req, res) => {
  try {
    const result = await VacancyDao.createOrUpadateVacancy(req.body);
    res.status(201).json(result);
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const deleteVacancy = async (req, res) => {
  try {
    const { id } = req.params;
    await VacancyDao.deleteVacancy(id);
    res.status(201).json({ result: "Vacancy removed" });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getVacancyBySearch = async (req, res) => {
  try {
    const vacancies = await VacancyDao.getVacanciesBySearch(req);
    vacancies.map((vacancy) => {
      vacancy.RecruitmentType = RecruitementType[vacancy.RecruitmentType];
    });
    res.status(200).json({ data: vacancies });
  } catch {
    res.status(404).json({ message: "Data Retrival Fails" });
  }
};
