import { google } from "googleapis";
import { authorize } from "./auth";
import { EmailTool } from "./email-tool";
import { GmailHandler } from "./gmail-handler";

const initGoogle = async () => {
  const auth = await authorize();
  return google.gmail({ version: "v1", auth });
};

export const buildEmailTool = async () => {
  const gmail = await initGoogle();
  const gmailHandler = new GmailHandler(gmail);
  return new EmailTool(gmailHandler);
};
