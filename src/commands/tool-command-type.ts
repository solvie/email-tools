import { ToolCommandType } from "../types/tool-command";
import { Option } from "commander";
import { EmailTool } from "../email-tool";

export const buildToolCommandType = (command: ToolCommandType): Option[] => {
  const type = command.type;
  const commandString = `--${command.name} <${type}>`;
  const mainOption = new Option(commandString, command.description);
  return [mainOption];
};

export const executeToolCommandType = async (
  emailTool: EmailTool,
  command: ToolCommandType,
  cmdsAndOpts: Record<string, string>
) => {
  const name = command.name;
  const required = cmdsAndOpts[command.name];
  await command.execute(emailTool, required);
};
