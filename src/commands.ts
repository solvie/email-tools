import { EmailTool } from "./email-tool";
import {
  ToolCommand,
  ToolCommandOption,
  ToolCommandType,
} from "./types/tool-command";

export const COMMANDS: ToolCommand[] = [
  <ToolCommandOption>{
    name: "list",
    description: "list objects",
    kind: "ToolCommandOption",
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
  },
  <ToolCommandType>{
    name: "read",
    description: "read email snippet with id",
    kind: "ToolCommandType",
    type: "id",
    execute: async (emailTools: EmailTool, id: string) => {
      await emailTools.readEmailSnippet(id);
    },
  },
];
