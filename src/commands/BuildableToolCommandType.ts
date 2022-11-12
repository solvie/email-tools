import { Buildable, ToolCommandType } from "../types/tool-command";
import { Option } from "commander";

export class BuildableToolCommandType implements Buildable {
  private command: ToolCommandType;

  constructor(toolCommand: ToolCommandType) {
    this.command = toolCommand;
  }

  public build(): Option[] {
    const type = this.command.type;
    const commandString = `--${this.command.name} <${type}>`;
    const mainOption = new Option(commandString, this.command.description);
    return [mainOption];
  }
}
