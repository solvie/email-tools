import {
  ConvertableToCommanderEnum,
  EMAIL_COMMANDS,
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
  emailCommand: EMAIL_COMMANDS.listEmails
};

const ListLabelOption: ToolOption = {
  name: "label",
  description: "",
  emailCommand: EMAIL_COMMANDS.listLabels,
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
  emailCommand: EMAIL_COMMANDS.readEmail,
};

export const COMMANDS: ToolCommand[] = [ListCommand, ReadCommand];
