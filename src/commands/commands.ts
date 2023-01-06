import { ToolCommand } from "../types/tool-command";
import { ListCommand } from "./list/listcommand";
import { ReadCommand } from "./read/readcommand";
import { ModifyCommand } from "./modify/modifycommand";

export const TOOL_COMMANDS: ToolCommand[] = [
  ListCommand,
  ReadCommand,
  ModifyCommand,
];
