import * as VacancyDao from "../data-access/Vacancy.dao.js";
import { ActiveStatus, RecruitementType } from "../constant/common.js";

const createVacancy = async (req, res) => {
  try {
    const vacancy = await VacancyDao.createOrUpadateVacancy(req.body);
    res.status(201).json({ result: vacancy });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
const deleteVacancy = async (req, res) => {
  try {
    const { id } = req.params;
    await VacancyDao.deleteVacancy(id);
    res.status(201).json({ result: "Vacancy removed" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const getVacancyBySearch = async (req, res) => {
  try {
    const vacancies = await VacancyDao.getVacanciesBySearch(req);
    vacancies.map((vacancy) => {
      vacancy.Status = ActiveStatus[vacancy.Status];
      vacancy.RecruitmentType = RecruitementType[vacancy.RecruitmentType];
    });
    res.status(200).json({ data: vacancies });
  } catch (e) {
    res.status(404).json({ message: "Data Retrival Fails" });
    console.log(e);
  }
};

export { createVacancy, deleteVacancy, getVacancyBySearch };
