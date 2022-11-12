import { GetMessagesCLP } from "../types/param";
import { GmailHandler } from "./gmail-handler";
import { Label } from "../types/gmail-schemas";

export class EmailTool {
  private gmailHandler: GmailHandler;

  constructor(gmailHandler: GmailHandler) {
    this.gmailHandler = gmailHandler;
  }

  public async listLabels() {
    const labels = await this.gmailHandler.labelsList();
    if (!labels || labels.length === 0) {
      console.log("No labels found.");
    } else {
      console.log("Labels:");
      labels.forEach((label: Label) => {
        console.log(`- name: ${label.name} id: ${label.id}`);
      });
    }
  }

  public async listEmails(getMessagesParams: GetMessagesCLP) {
    const messages = await this.gmailHandler.messagesList(getMessagesParams);
    if (!messages || messages.length === 0) {
      console.log("No messages found.");
    } else {
      console.log(messages);
    }
  }

  public async readEmailSnippet(messageId: string) {
    const message = await this.gmailHandler.messagesGet(messageId);
    if (!message) {
      console.log("No message found.");
    } else {
      console.log(message?.snippet);
    }
  }
}
