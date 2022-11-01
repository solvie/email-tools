import { gmail_v1 } from "googleapis";

export class GmailHandler {
  private gmailClient: gmail_v1.Gmail;
  private me = "me";
  
  constructor(gmailClient: gmail_v1.Gmail){
    this.gmailClient = gmailClient;
  }

  public async listLabels() {
    const res = await this.gmailClient.users.labels.list({
      userId: this.me,
    });
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

  public async listUnreads() {
    const res = await this.gmailClient.users.messages.list({
      userId: this.me,
      maxResults: 10,
    });
    const messages = res.data.messages;
    if (!messages || messages.length === 0) {
      console.log("No messages found.");
      return;
    }
    console.log(messages);
  }

  public async readEmailSnippet(messageId: string) {
    console.log(messageId)
    const res = await this.gmailClient.users.messages.get({
      userId: this.me,
      id: messageId
    });
    const message: gmail_v1.Schema$Message = res.data; 
    console.log(message.snippet);
  }
}

