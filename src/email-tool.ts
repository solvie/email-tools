import { gmail_v1 } from "googleapis";
import { GetMessagesCLP } from "./types";
import { GmailHandler } from "./gmail-handler";

export class EmailTool {
  private gmailHandler: GmailHandler;
  
  constructor(gmailHandler: GmailHandler){
    this.gmailHandler = gmailHandler;
  }

  public async listLabels() {
    const labels = await this.gmailHandler.labelsList();
    if (!labels || labels.length === 0) {
      console.log("No labels found.");
      return;
    }
    console.log("Labels:");
    labels.forEach((label: gmail_v1.Schema$Label) => {
      console.log(`- name: ${label.name} id: ${label.id}`);
    });
  }

  public async listEmails(getMessagesParams: GetMessagesCLP) {
    const messages = await this.gmailHandler.messagesList(getMessagesParams);
    if (!messages || messages.length === 0) {
      console.log("No messages found.");
      return;
    }
    console.log(messages);
  }

  public async readEmailSnippet(messageId: string) {
    const message = await this.gmailHandler.messagesGet(messageId);
    console.log(message?.snippet);
  }
}

