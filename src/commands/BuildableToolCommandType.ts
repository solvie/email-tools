import { Buildable, ToolCommandType } from "../types/tool-command";
import { Option } from "commander";
import { OptionFactory } from "../commander-wrapper/OptionFactory";

export class BuildableToolCommandType implements Buildable {
  private command: ToolCommandType;

  constructor(toolCommand: ToolCommandType) {
    this.command = toolCommand;
  }

  public build(): Option[] {
    return [OptionFactory.option(this.command)];
  }
}
