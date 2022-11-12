import { Command, Option } from "commander";
import { ToolCommand } from "./types/tool-command";
import { buildEmailTool } from "./tool-builder";
import { ToolCommandBuilderFactory } from "./commands/ToolCommandBuilderFactory";
import { ToolCommandRunnerFactory } from "./commands/ToolCommandRunnerFactory";

const buildOptions = (commands: ToolCommand[]): Option[] =>
  commands.reduce(
    (previous: Option[], command: ToolCommand) => [
      ...previous,
      ...ToolCommandBuilderFactory.createBuildable(command).build(),
    ],
    []
  );

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
        new ToolCommandRunnerFactory(emailTool)
          .createRunnable(command)
          .run(cmdsAndOpts);
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
