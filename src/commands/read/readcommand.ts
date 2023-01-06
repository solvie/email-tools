import { COMMANDS, ToolCommandType, ToolCommandTypeInput } from "../../types/tool-command";
import { toolCommandTypeMaker } from "../converters";
import { ToolCommandMaker } from "../ToolCommandMaker";

export const ReadCommand = ToolCommandMaker.make<
  ToolCommandTypeInput,
  ToolCommandType
>(toolCommandTypeMaker, {
  name: "read",
  description: "read email snippet with id",
  type: "id",
  runCommand: COMMANDS.readEmail,
});
