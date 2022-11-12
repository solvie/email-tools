import { ToolCommandBuilderFactory } from "./commands/ToolCommandBuilderFactory";
import { Executable, ToolCommand } from "./types/tool-command";
import { Command, Option } from "commander";
import { buildEmailTool } from "./email/tool-builder";

export class Program {
  private executable: Executable[] = [];
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
    this.executable.forEach((executable: Executable) =>
      this.programAddOptions(executable.build())
    );
  }

  public build(toolCommands: ToolCommand[]) {
    this.executable = toolCommands.map((tc) => ToolCommandBuilderFactory.createBuildable(tc));
    this.buildOptions();
  }

  public async execute() {
    try {
      this.program.parse();
      const cmdsAndOpts = this.program.opts();
      const emailTool = await buildEmailTool();
      this.executable.forEach(async (executable) => {
        const name = executable.name;
        const cmdFound = cmdsAndOpts[name];
        if (cmdFound) {
          executable.run(cmdsAndOpts, emailTool);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
}
