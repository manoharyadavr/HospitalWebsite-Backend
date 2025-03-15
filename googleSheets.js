const { google } = require("googleapis");
require("dotenv").config(); // ✅ Load environment variables

const appendToSheet = async (data, type) => {
  try {
    console.log(`📤 Sending Data to Google Sheets (${type}):`, data);

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // ✅ Get spreadsheet ID from .env
    let spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // ✅ Automatically select correct sheet
    let sheetName = type === "contact" ? "contact" : "day1";

    if (!data || !data.length) {
      console.error("❌ Invalid data, skipping Google Sheets update.");
      return;
    }

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `'${sheetName}'!A:F`, // ✅ Now correctly referencing "day1" and "contact"
      valueInputOption: "USER_ENTERED",
      requestBody: { values: data },
    });

    console.log(`✅ Google Sheets API Response (${sheetName}):`, JSON.stringify(response.data, null, 2));
    console.log(`✅ Data added to Google Sheets (${sheetName}):`, data);
  } catch (error) {
    console.error(`❌ Google Sheets API Error (${sheetName}):`, error.message);
  }
};

module.exports = appendToSheet;
