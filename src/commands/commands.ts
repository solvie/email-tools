import {
  COMMANDS,
  ToolCommand,
  ToolCommandOption,
  ToolCommandOptionInput,
  ToolCommandType,
  ToolCommandTypeInput,
  ToolOption,
  ToolParam,
  ToolParamInput,
} from "../types/tool-command";
import { ToolCommandMaker } from "./ToolCommandMaker";
import {
  toolCommandOptionMaker,
  toolCommandTypeMaker,
  toolParamMaker,
} from "./converters";

const QueryParam = ToolCommandMaker.make<ToolParamInput, ToolParam>(
  toolParamMaker,
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

const ListCommand = ToolCommandMaker.make<
  ToolCommandOptionInput,
  ToolCommandOption
>(toolCommandOptionMaker, {
  name: "list",
  description: "list objects",
  options: [ListEmailOption, ListLabelOption],
});

const ReadCommand = ToolCommandMaker.make<
  ToolCommandTypeInput,
  ToolCommandType
>(toolCommandTypeMaker, {
  name: "read",
  description: "read email snippet with id",
  type: "id",
  runCommand: COMMANDS.readEmail,
});

export const TOOL_COMMANDS: ToolCommand[] = [ListCommand, ReadCommand];
