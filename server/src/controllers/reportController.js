import puppeteer from "puppeteer";
import { html } from "../../reports/applicantsReport.js";

export const ApplicanatsReport = async (req, res) => {
  const browser = await puppeteer.launch({
    headless: "new",
    userDataDir: "./reports/tmp",
  });

  const file = html();
  const page = await browser.newPage();
  page.isJavaScriptEnabled(true);
  await page.setContent(file, {
    waitUntil: "domcontentloaded",
  });
  await page.emulateMediaType("screen");
  const pdf = await page.pdf({
    printBackground: true,
    format: "A4",
    landscape: true,
    margin: { top: 50, bottom: 50, left: 50, right: 50 },
  });
  res.setHeader("Content-Length", pdf.length);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "RPTScheduleDetails.pdf");
  res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
  res.send(pdf);
  await browser.close();
};
