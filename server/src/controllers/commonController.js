import MasterDao from "../data-access/Master.dao.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const MasterData = async (req, res) => {
  try {
    const masterData = await MasterDao.getMasterData();
    res.status(201).json({ data: masterData });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const downloadFile = (req, res) => {
  try {
    const fileURL = `${path.join(
      __dirname,
      "../../public/assets",
      req.body.fileName
    )}`;
    var file = fs.createReadStream(fileURL);
    var stat = fs.statSync(fileURL);
    res.setHeader("Content-Length", stat.size);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + req.body.fileName
    );
    file.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "File Download is corrupted" });
  }
};
