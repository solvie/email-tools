import { Command, Option } from "commander";
import {
  ToolCommand,
  ToolCommandOption,
  ToolCommandType,
} from "./types/tool-command";
import { buildEmailTool } from "./tool-builder";

const toolCommandOption = (command: ToolCommandOption): Option[] => {
  let opts = [];
  const options = command.options;
  const commandString = `--${command.name} <option>`;
  const choices = options.map((o) => o.name);
  const mainOption = new Option(commandString, command.description).choices(
    choices
  );
  opts.push(mainOption);
  const optionsWithParams = options.filter((o) => o.params);
  optionsWithParams.forEach((op) => {
    const params = op.params!;
    const paramsAsOpts = params.map(
      (p) => new Option(`--${p.name} <${p.type}>`, p.description)
    );
    opts.push(...paramsAsOpts);
  });
  return opts;
};

const toolCommandType = (command: ToolCommandType): Option[] => {
  const type = command.type;
  const commandString = `--${command.name} <${type}>`;
  const mainOption = new Option(commandString, command.description);
  return [mainOption];
};

const buildProgram = (commands: ToolCommand[]): Option[] =>
  commands.reduce((previous: Option[], command: ToolCommand) => {
    switch (command.kind) {
      case "ToolCommandOption":
        previous.push(...toolCommandOption(command));
        break;
      case "ToolCommandType":
        previous.push(...toolCommandType(command));
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
    console.log(cmdsAndOpts);
    const emailTool = await buildEmailTool();
    toolCommands.forEach(async (command) => {
      const name = command.name;
      const cmdFound = cmdsAndOpts[name];
      if (cmdFound) {
        switch (command.kind) {
          case "ToolCommandOption":
            // one of the options must be checked.
            const found = command.options!.find(
              (o) => o.name === cmdsAndOpts[name]
            );
            if (!found) {
              console.log("not found");
            } else if (!found.params) {
              await found.execute(emailTool);
            } else if (found.params) {
              const params = found.params;
              const paramObj: any = {};
              params.forEach((p) => {
                if (cmdsAndOpts[p.name]) {
                  paramObj[p.inputName] = cmdsAndOpts[p.name];
                }
              });
              found.execute(emailTool, paramObj);
            }
            break;
          case "ToolCommandType":
            const required = cmdsAndOpts[command.name];
            await command.execute(emailTool, required);
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
  const optsToAdd = buildProgram(commands);
  optsToAdd.forEach((opt) => program.addOption(opt));
  return program;
};
