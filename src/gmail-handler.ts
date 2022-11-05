import { gmail_v1 } from "googleapis";
import { GetMessagesCLP } from "./types";
import { ParamBuilder } from "./param-builder"

export class GmailHandler {
  private gmailClient: gmail_v1.Gmail;
  
  constructor(gmailClient: gmail_v1.Gmail){
    this.gmailClient = gmailClient;
  }

  public async labelsList(): Promise<gmail_v1.Schema$Label[] | undefined> {
    const res = await this.gmailClient.users.labels.list(ParamBuilder.baseInputParams());
    return res.data?.labels;
  }

  public async messagesList(getMessagesParams: GetMessagesCLP): Promise<gmail_v1.Schema$Message[] | undefined>  {
    const res = await this.gmailClient.users.messages.list(
      ParamBuilder.emailParams(getMessagesParams)
    );
    return res.data.messages;
  }

  public async messagesGet(messageId: string): Promise<gmail_v1.Schema$Message | undefined> {
    const res = await this.gmailClient.users.messages.get(
      ParamBuilder.readSnippetParams(messageId)
    );
    return res.data; 
  }
}

