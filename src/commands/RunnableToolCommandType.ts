import { Runnable, Tool, ToolCommandType } from "../types/tool-command";

export class RunnableToolCommandType implements Runnable {
  private command: ToolCommandType;

  constructor(toolCommand: ToolCommandType) {
    this.command = toolCommand;
  }

  public async run(cmdsAndOpts: Record<string, string>, tool: Tool) {
    const name = this.command.name;
    const required = cmdsAndOpts[name];
    return await tool.run(this.command.runCommand, required);
  }
}
