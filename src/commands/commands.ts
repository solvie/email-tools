import {
  COMMANDS,
  ToolCommand,
  ToolCommandOption,
  ToolCommandType,
  ToolOption,
  ToolParam,
} from "../types/tool-command";
import { ToolParamFactory } from "./ToolParamFactory";
import { ToolCommandOptionFactory } from "./ToolCommandOptionFactory";
import { ToolCommandTypeFactory } from "./ToolCommandTypeFactory";

const QueryParam: ToolParam = ToolParamFactory.make({
  name: "query",
  inputName: "q",
  type: "string",
  description: "query string to search emails by",
});

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

const ListCommand: ToolCommandOption = ToolCommandOptionFactory.make({
  name: "list",
  description: "list objects",
  options: [ListEmailOption, ListLabelOption],
});

const ReadCommand: ToolCommandType = ToolCommandTypeFactory.make({
  name: "read",
  description: "read email snippet with id",
  type: "id",
  runCommand: COMMANDS.readEmail,
});

export const TOOL_COMMANDS: ToolCommand[] = [ListCommand, ReadCommand];
