import * as fs from "fs/promises";
import * as path from "path";
import * as process from "process";
import { authenticate } from "@google-cloud/local-auth";
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import { JSONClient } from "google-auth-library/build/src/auth/googleauth";

// COPY FROM https://developers.google.com/gmail/api/quickstart/nodejs
// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.

const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

/**
 *  * Reads previously authorized credentials from the save file.
 *   *
 *    * @return {Promise<OAuth2Client|null>}
 *     */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await (await fs.readFile(TOKEN_PATH)).toString();
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

async function saveCredentials(client: OAuth2Client) {
  const content = await (await fs.readFile(CREDENTIALS_PATH)).toString();
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 *  * Load or request or authorization to call APIs.
 *   *
 *    */
export async function authorize() {
  let client: JSONClient | OAuth2Client | null= await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client?.credentials) {
    await saveCredentials(client);
  }
  return client;
}
