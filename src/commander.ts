import { Command, Option } from "commander";
import { ToolCommand } from "./types/tool-command";
import { buildEmailTool } from "./tool-builder";

const buildProgram = (program: Command, commands: ToolCommand[]) => {
  program
    .name("email-tools")
    .description("CLI for interacting with gmail api ");
  commands.forEach((command) => {
    let commandString = `--${command.name}`;
    let choices;
    let subOptions: Option[] = [];
    const { options, type } = command;
    if (options) {
      commandString = commandString + " <option>";
      choices = options.map((o) => o.name);
      const optionsWithParams = options.filter((o) => o.params);
      optionsWithParams.forEach((op) => {
        const params = op.params!;
        const paramsAsOpts = params.map(
          (p) => new Option(`--${p.name} <${p.type}>`, p.description)
        );
        subOptions.push(...paramsAsOpts);
      });
    }
    if (type) {
      commandString = `${commandString} <${type}>`;
    }
    const mainOption = new Option(commandString, command.description);
    if (choices) mainOption.choices(choices);
    program.addOption(mainOption);
    if (subOptions.length > 0) {
      subOptions.forEach((so) => program.addOption(so));
    }
  });
};

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
      const options = command.options;
      const type = command.type;
      const cmdFound = cmdsAndOpts[name];
      if (cmdFound) {
        if (type) {
          const required = cmdsAndOpts[type];
          await command.execute!(emailTool, required);
        } else if (options) {
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
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
};

export const generateProgram = (commands: ToolCommand[]) => {
  const program = new Command();
  buildProgram(program, commands);
  return program;
};
