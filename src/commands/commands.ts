import { EmailTool } from "../email-tool";
import {
  ToolCommand,
  ToolCommandEnum,
  ToolCommandOption,
  ToolCommandType,
} from "../types/tool-command";

export const ListCommand: ToolCommandOption = {
  name: "list",
  description: "list objects",
  kind: ToolCommandEnum.option,
  options: [
    {
      name: "email",
      description: "",
      params: [
        {
          name: "query",
          inputName: "q",
          type: "string",
          description: "query string to search emails by",
        },
      ],
      execute: async (emailTools: EmailTool, params?: any) => {
        await emailTools.listEmails(params);
      },
    },
    {
      name: "label",
      description: "",
      execute: async (emailTools: EmailTool) => {
        await emailTools.listLabels();
      },
    },
  ],
};

export const ReadCommand: ToolCommandType = {
  name: "read",
  description: "read email snippet with id",
  kind: ToolCommandEnum.type,
  type: "id",
  execute: async (emailTools: EmailTool, id: string) => {
    await emailTools.readEmailSnippet(id);
  },
};

export const COMMANDS: ToolCommand[] = [ListCommand, ReadCommand];
