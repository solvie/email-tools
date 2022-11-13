import {
  COMMANDS,
  ToolCommand,
  ToolCommandFactoryType,
  ToolCommandOption,
  ToolCommandType,
  ToolOption,
  ToolParam,
} from "../types/tool-command";
import { ToolCommandOptionFactory } from "./ToolCommandOptionFactory";

const QueryParam = <ToolParam>ToolCommandOptionFactory.make(
  ToolCommandFactoryType.toolParam,
  {
    name: "query",
    inputName: "q",
    type: "string",
    description: "query string to search emails by",
  }
);

const ListEmailOption: ToolOption = {
  name: "email",
  description: "",
  params: [QueryParam],
  runCommand: COMMANDS.listEmails,
};

const ListLabelOption: ToolOption = {
  name: "label",
  description: "",
  runCommand: COMMANDS.listLabels,
};

const ListCommand = <ToolCommandOption>ToolCommandOptionFactory.make(
  ToolCommandFactoryType.toolCommandOption,
  {
    name: "list",
    description: "list objects",
    options: [ListEmailOption, ListLabelOption],
  }
);

const ReadCommand = <ToolCommandType>ToolCommandOptionFactory.make(
  ToolCommandFactoryType.toolCommandType,
  {
    name: "read",
    description: "read email snippet with id",
    type: "id",
    runCommand: COMMANDS.readEmail,
  }
);

export const TOOL_COMMANDS: ToolCommand[] = [ListCommand, ReadCommand];
