import puppeteer from "puppeteer";
import { generateHTML } from "../../reports/applicantsReport.js";

export const ApplicanatsReport = async (req, res) => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setContent(generateHTML(), { waitUntil: "domcontentloaded" });
  await page.emulateMediaType("screen");
  const pdf = await page.pdf({
    printBackground: true,
    format: "A4",
    landscape: true,
  });
  await browser.close();
  res.setHeader("Content-Length", pdf.length);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=ApplicantsReport.pdf"
  );
  res.send(pdf);
};
