const { google } = require("googleapis");
require("dotenv").config(); // ✅ Load environment variables

// ✅ Append Data to Google Sheets
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
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // ✅ Automatically select the correct sheet
    const sheetName = type === "contact" ? "contact" : "day1";

    if (!data || !data.length) {
      console.error("❌ Invalid data, skipping Google Sheets update.");
      return;
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `'${sheetName}'!A:F`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: data },
    });

    console.log(`✅ Data added to Google Sheets (${sheetName}):`, data);
  } catch (error) {
    console.error(`❌ Google Sheets API Error (${type}):`, error.message);
  }
};

// ✅ Fetch Data from Google Sheets
const getSheetData = async (type) => {
  try {
    console.log(`📥 Fetching Data from Google Sheets (${type})`);

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // ✅ Get spreadsheet ID from .env
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // ✅ Automatically select the correct sheet
    const sheetName = type === "contact" ? "contact" : "day1";

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `'${sheetName}'!A:F`,
    });

    console.log(`✅ Data fetched from Google Sheets (${sheetName}):`, response.data.values);
    return response.data.values || [];
  } catch (error) {
    console.error(`❌ Google Sheets Fetch Error (${type}):`, error.message);
    return [];
  }
};

// ✅ Ensure proper exports
module.exports = { appendToSheet, getSheetData };
