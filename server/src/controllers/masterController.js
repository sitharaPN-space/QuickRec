import MasterDao from "../data-access/Master.dao.js";

export const MasterData = async (req, res) => {
  try {
    const masterData = await MasterDao.getMasterData();
    res.status(201).json({ data: masterData });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
