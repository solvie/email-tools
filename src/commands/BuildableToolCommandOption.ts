import { Buildable, ToolCommandOption } from "../types/tool-command";
import { Option } from "commander";
import { OptionFactory } from "../commander-wrapper/OptionFactory";

export class BuildableToolCommandOption implements Buildable {
  private command: ToolCommandOption;

  constructor(toolCommand: ToolCommandOption) {
    this.command = toolCommand;
  }

  private paramOptions(): Option[] {
    const optionsWithParams = this.command.options.filter((o) => o.params);
    return optionsWithParams.reduce(
      (previous: Option[], current) => [
        ...previous,
        ...current.params!.map((p) => OptionFactory.option(p)),
      ],
      []
    );
  }

  public build(): Option[] {
    return [OptionFactory.option(this.command), ...this.paramOptions()];
  }
}
