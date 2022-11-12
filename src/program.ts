import { ToolCommandBuilderFactory } from "./commands/ToolCommandBuilderFactory";
import { ToolCommand } from "./types/tool-command";
import { Command, Option } from "commander";
import { buildEmailTool } from "./email/tool-builder";
import { ToolCommandRunnerFactory } from "./commands/ToolCommandRunnerFactory";

export class Program {
  private toolCommands: ToolCommand[] = [];
  private program: Command;

  constructor() {
    this.program = new Command();
    this.program
      .name("email-tools")
      .description("CLI for interacting with gmail api ");
  }

  private programAddOptions(options: Option[]) {
    options.forEach((opt) => this.program.addOption(opt));
  }

  private buildOptions() {
    this.toolCommands.forEach((command: ToolCommand) =>
      this.programAddOptions(
        ToolCommandBuilderFactory.createBuildable(command).build()
      )
    );
  }

  public build(toolCommands: ToolCommand[]) {
    this.toolCommands = toolCommands;
    this.buildOptions();
  }

  public async execute() {
    try {
      this.program.parse();
      const cmdsAndOpts = this.program.opts();
      const emailTool = await buildEmailTool();
      this.toolCommands.forEach(async (command) => {
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
  }
}
