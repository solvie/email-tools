import { gmail_v1 } from "googleapis";
import { GetMessagesCLP } from "./types";
import { ParamBuilder } from "./param-builder"

export class GmailHandler {
  private gmailClient: gmail_v1.Gmail;
  
  constructor(gmailClient: gmail_v1.Gmail){
    this.gmailClient = gmailClient;
  }

  public async listLabels() {
    const res = await this.gmailClient.users.labels.list(ParamBuilder.baseInputParams());
    const labels = res.data?.labels;
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
    const res = await this.gmailClient.users.messages.list(
      ParamBuilder.emailParams(getMessagesParams)
    );
    const messages = res.data.messages;
    if (!messages || messages.length === 0) {
      console.log("No messages found.");
      return;
    }
    console.log(messages);
  }

  public async readEmailSnippet(messageId: string) {
    const res = await this.gmailClient.users.messages.get(
      ParamBuilder.readSnippetParams(messageId)
    );
    const message: gmail_v1.Schema$Message = res.data; 
    console.log(message.snippet);
  }
}

