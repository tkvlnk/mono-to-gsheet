/* eslint-disable @typescript-eslint/naming-convention */
import { google } from "googleapis";
import clientSecrets from "../secrets/client-secret.json" assert {
  type: "json",
};
import credentials from "../secrets/credentials.json" assert { type: "json" };

const {
  client_id,
  client_secret,
  redirect_uris: [redirect_uri],
} = clientSecrets.installed;

const auth = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uri,
);

auth.setCredentials(credentials);

export const googleSheetsApi = google.sheets({ version: "v4", auth });
