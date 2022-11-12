import { Buildable, ToolCommandOption, ToolParam } from "../types/tool-command";
import { Option } from "commander";

export class BuildableToolCommandOption implements Buildable {
  private command: ToolCommandOption;

  constructor(toolCommand: ToolCommandOption) {
    this.command = toolCommand;
  }

  private mainOption(): Option {
    const commandString = `--${this.command.name} <option>`;
    const choices = this.command.options.map((o) => o.name);
    return new Option(commandString, this.command.description).choices(choices);
  }

  private paramOptions(): Option[] {
    const optionsWithParams = this.command.options.filter((o) => o.params);
    const paramToOption = (p: ToolParam) =>
      new Option(`--${p.name} <${p.type}>`, p.description);
    return optionsWithParams.reduce(
      (previous: Option[], current) => [
        ...previous,
        ...current.params!.map((p) => paramToOption(p)),
      ],
      []
    );
  }

  public build(): Option[] {
    return [this.mainOption(), ...this.paramOptions()];
  }
}
