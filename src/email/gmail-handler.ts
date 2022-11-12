import { gmail_v1 } from "googleapis";
import { GetMessagesCLP } from "../types/param";
import { Label, Message } from "../types/gmail-schemas";
import { ParamBuilder } from "./param-builder";

export class GmailHandler {
  private gmailClient: gmail_v1.Gmail;

  constructor(gmailClient: gmail_v1.Gmail) {
    this.gmailClient = gmailClient;
  }

  public async labelsList(): Promise<Label[]> {
    let labelArr: Label[] = [];
    const res = await this.gmailClient.users.labels.list(
      ParamBuilder.baseInputParams()
    );
    const labels = res.data?.labels;
    if (labels) {
      labelArr = labels.map((l) => ({
        id: l.id!,
        name: l.name!,
      }));
    }
    return labelArr;
  }

  public async messagesList(
    getMessagesParams: GetMessagesCLP
  ): Promise<Message[]> {
    let messageArr: Message[] = [];
    const res = await this.gmailClient.users.messages.list(
      ParamBuilder.emailParams(getMessagesParams)
    );
    const messages = res.data.messages;
    if (messages) {
      messageArr = messages.map((m) => ({
        id: m.id!,
        threadId: m.threadId!,
      }));
    }
    return messageArr;
  }

  public async messagesGet(messageId: string): Promise<Message | undefined> {
    const res = await this.gmailClient.users.messages.get(
      ParamBuilder.readSnippetParams(messageId)
    );
    const message = res.data;
    if (message) {
      return {
        id: message.id!,
        threadId: message.threadId!,
        snippet: message.snippet || undefined,
      };
    }
  }
}
