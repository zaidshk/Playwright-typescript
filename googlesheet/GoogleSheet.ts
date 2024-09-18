import { google } from 'googleapis';

import * as dotenv from 'dotenv';
dotenv.config();

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

export class GoogleSheet {

  private getInstance() {
    const auth = this.authorize();
    return google.sheets({ version: "v4", auth });
  }

  private getConfig() {
    const oauthConfig = JSON.parse(process.env.QA_DEV_GOOGLE_CONFIG as any);
    return oauthConfig;
  }

  private authorize() {
    const { private_key, client_email, client_id } = this.getConfig();
    const auth2 = new google.auth.GoogleAuth({
      credentials: {
        client_email,
        client_id,
        private_key,
      },
      scopes: SCOPES,
    });
    return auth2;
  }

  getSheet(id: string, range: string) {
    const sheets = this.getInstance().spreadsheets;
    return sheets.values.get(
      {
        spreadsheetId: id,
        range: range,
      }
    );
  }


  async getEnvironmentUrl() {
    const local = "http://localhost:8000";
    const sheetData = await this.getSheet('1uoS99ZUwQc1JC9rim3nA5VWqtjOlsTApdY8gULE_UJg', 'Sheet1!A:C');
    const values = sheetData.data.values;
    if (!values) return local;
    for (let i = 0; i < values.length; i++) {
      for (let j = 0; j < values[i].length; j++) {
        if (`${values[i][2]}`.toLowerCase() === "current" && `${values[j][2]}`.toLowerCase() === "yes") {
          return values[j][1];
        }
      }
    }
    return local;
  }

}


// (async () => {
//   const sh = new GoogleSheet();
//   const url = await sh.getEnvironmentUrl();
//   console.log({ url });
// })()
