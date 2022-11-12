import { ExecutableToolCommandFactory } from "./executable/ExecutableToolCommandFactory";
import { Executable, ToolCommand } from "./types/tool-command";
import { Command } from "commander";
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

  public build(toolCommands: ToolCommand[]) {
    this.executable = toolCommands.map((tc) =>
      ExecutableToolCommandFactory.make(tc)
    );
    this.executable.forEach((executable: Executable) =>
      executable.build().forEach((opt) => this.program.addOption(opt))
    );
  }

  public async execute() {
    try {
      this.program.parse();
      const cmdsAndOpts = this.program.opts();
      const emailTool = await buildEmailTool();
      this.executable.forEach(
        async (executable) =>
          cmdsAndOpts[executable.name] && executable.run(cmdsAndOpts, emailTool)
      );
    } catch (e) {
      console.log(e);
    }
  }
}
