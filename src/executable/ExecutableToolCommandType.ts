import { Executable, Tool, ToolCommandType } from "../types/tool-command";
import { Option } from "commander";
import { OptionFactory } from "../commander-wrapper/OptionFactory";

export class ExecutableToolCommandType implements Executable {
  private command: ToolCommandType;
  public name: string;

  constructor(toolCommand: ToolCommandType) {
    this.command = toolCommand;
    this.name = toolCommand.name;
  }

  public build(): Option[] {
    return [OptionFactory.option(this.command)];
  }

  public async run(cmdsAndOpts: Record<string, string>, tool: Tool) {
    const name = this.command.name;
    const required = cmdsAndOpts[name];
    return await tool.run(this.command.runCommand, required);
  }
}
