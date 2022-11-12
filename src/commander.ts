import { Command, Option } from "commander";
import { ToolCommand, ToolCommandEnum } from "./types/tool-command";
import { buildEmailTool } from "./tool-builder";
import {
  buildToolCommandOption,
  executeToolCommandOption,
} from "./commands/tool-command-option";
import {
  buildToolCommandType,
  executeToolCommandType,
} from "./commands/tool-command-type";

const buildOptions = (commands: ToolCommand[]): Option[] =>
  commands.reduce((previous: Option[], command: ToolCommand) => {
    switch (command.kind) {
      case ToolCommandEnum.option:
        previous.push(...buildToolCommandOption(command));
        break;
      case ToolCommandEnum.type:
        previous.push(...buildToolCommandType(command));
        break;
    }
    return previous;
  }, []);

export const executeProgram = async (
  program: Command,
  toolCommands: ToolCommand[]
) => {
  try {
    program.parse();
    const cmdsAndOpts = program.opts();
    const emailTool = await buildEmailTool();
    toolCommands.forEach(async (command) => {
      const name = command.name;
      const cmdFound = cmdsAndOpts[name];
      if (cmdFound) {
        switch (command.kind) {
          case ToolCommandEnum.option:
            await executeToolCommandOption(emailTool, command, cmdsAndOpts);
            break;
          case ToolCommandEnum.type:
            await executeToolCommandType(emailTool, command, cmdsAndOpts);
            break;
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
};

export const generateProgram = (commands: ToolCommand[]) => {
  const program = new Command();
  program
    .name("email-tools")
    .description("CLI for interacting with gmail api ");
  const optsToAdd = buildOptions(commands);
  optsToAdd.forEach((opt) => program.addOption(opt));
  return program;
};
