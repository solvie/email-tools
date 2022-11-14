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
    required: false,
  }
);

const LabelIdsParam = ToolCommandMaker.make<ToolParamInput, ToolParam>(
  toolParamMaker,
  {
    name: "labelIds",
    inputName: "labelIds",
    type: "string[]",
    description: "label ids to find emails by",
    required: false,
  }
);

const LimitResultsParam = ToolCommandMaker.make<ToolParamInput, ToolParam>(
  toolParamMaker,
  {
    name: "maxResults",
    inputName: "maxResults",
    type: "number",
    description: "max number of results",
    required: false,
  }
);

const ListEmailOption: ToolOption = {
  name: "email",
  description: "",
  params: [QueryParam, LabelIdsParam, LimitResultsParam],
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

const AddLabels = ToolCommandMaker.make<ToolParamInput, ToolParam>(
  toolParamMaker,
  {
    name: "addLabels",
    inputName: "addLabelIds",
    type: "string[]",
    description: "label ids to add to emails",
    required: false,
  }
);

const RemoveLabels = ToolCommandMaker.make<ToolParamInput, ToolParam>(
  toolParamMaker,
  {
    name: "removeLabels",
    inputName: "removeLabelIds",
    type: "string[]",
    description: "label ids to remove from emails",
    required: false,
  }
);

const MessageIds = ToolCommandMaker.make<ToolParamInput, ToolParam>(
  toolParamMaker,
  {
    name: "messages",
    inputName: "ids",
    type: "string[]",
    description: "email ids to modify",
    required: true,
  }
);

const ModifyEmailOption: ToolOption = {
  name: "email",
  description: "",
  runCommand: COMMANDS.modifyEmails,
  params: [MessageIds, AddLabels, RemoveLabels],
};

const ModifyCommand = ToolCommandMaker.make<
  ToolCommandOptionInput,
  ToolCommandOption
>(toolCommandOptionMaker, {
  name: "modify",
  description: "modify objects",
  options: [ModifyEmailOption],
});

export const TOOL_COMMANDS: ToolCommand[] = [
  ListCommand,
  ReadCommand,
  ModifyCommand,
];
