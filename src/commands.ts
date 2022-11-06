import { EmailTool } from "./email-tool";
import { ToolCommand } from "./types/tool-command";

export const COMMANDS: ToolCommand[] = [
  {
    name: "list",
    description: "list objects",
    options: [
      {
        name: "email",
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
        execute: async (emailTools: EmailTool) => {
          await emailTools.listLabels();
        },
      },
    ],
  },
  {
    name: "read",
    description: "read email snippet with id",
    type: "id",
    execute: async (emailTools: EmailTool, id: string) => {
      await emailTools.readEmailSnippet(id);
    },
  },
];
