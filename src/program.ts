import { ExecutableToolCommandFactory } from "./executable/ExecutableToolCommandFactory";
import { Executable, Named, Tool, ToolCommand } from "./types/tool-command";
import { Command } from "commander";

export class Program {
  private executable: Executable[] = [];
  private program: Command;

  constructor(named: Named) {
    this.program = new Command();
    this.program.name(named.name).description(named.description);
  }

  public build(toolCommands: ToolCommand[]) {
    this.executable = toolCommands.map((tc) =>
      ExecutableToolCommandFactory.make(tc)
    );
    this.executable.forEach((executable: Executable) =>
      executable.build().forEach((opt) => this.program.addOption(opt))
    );
  }

  public async execute(tool: Tool) {
    this.program.parse();
    const cmdsAndOpts = this.program.opts();
    for (const exec of this.executable) {
      cmdsAndOpts[exec.name] && (await exec.run(cmdsAndOpts, tool));
    }
  }
}
