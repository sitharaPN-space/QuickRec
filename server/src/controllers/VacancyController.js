import * as VacancyDao from "../data-access/Vacancy.dao.js";

const createVacancy = async (req, res) => {
  // if (!req.userId) return res.json({ message: "Unauthenticated" });

  try {
    const {
      VacancyName,
      RecruitmentType,
      SalaryGroupId,
      BoardGradeId,
      PublishedDate,
      ClosingDate,
      NoOfVacancies,
      PlannedInterViewDate,
      AgeLimit,
      Remarks,
      Status,
    } = req.body;
    const vacancy = await VacancyDao.createOrUpadateVacancy(req.body);
    res.status(201).json({ result: vacancy });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const getVacanciesForApply = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const getVacancyBySearch = async (req, res) => {
  try {
    // const title = new RegExp(searchQuery, "i"); // ignore
    // console.log("DEBUG:", searchQuery);
    const vacancies = await VacancyDao.getVacanciesBySearch(req);
    res.status(200).json({ result: vacancies });
  } catch (e) {
    console.log(e);
  }
};

export { createVacancy, getVacancyBySearch };
