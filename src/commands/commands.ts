import { EmailTool } from "../email/email-tool";
import {
  ConvertableToCommanderEnum,
  ToolCommand,
  ToolCommandEnum,
  ToolCommandOption,
  ToolCommandType,
  ToolOption,
} from "../types/tool-command";

const ListEmailOption: ToolOption = {
  name: "email",
  description: "",
  params: [
    {
      name: "query",
      inputName: "q",
      type: "string",
      description: "query string to search emails by",
      convertable: ConvertableToCommanderEnum.baseOption,
    },
  ],
  execute: async (emailTools: EmailTool, params?: any) => {
    await emailTools.listEmails(params);
  },
};

const ListLabelOption: ToolOption = {
  name: "label",
  description: "",
  execute: async (emailTools: EmailTool) => {
    await emailTools.listLabels();
  },
};

const ListCommand: ToolCommandOption = {
  name: "list",
  description: "list objects",
  kind: ToolCommandEnum.option,
  options: [ListEmailOption, ListLabelOption],
  convertable: ConvertableToCommanderEnum.optionWithChoices,
};

const ReadCommand: ToolCommandType = {
  convertable: ConvertableToCommanderEnum.baseOption,
  name: "read",
  description: "read email snippet with id",
  kind: ToolCommandEnum.type,
  type: "id",
  execute: async (emailTools: EmailTool, id: string) => {
    await emailTools.readEmailSnippet(id);
  },
};

export const COMMANDS: ToolCommand[] = [ListCommand, ReadCommand];
