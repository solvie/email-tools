import {
  Executable,
  Tool,
  ToolCommandOption,
  ToolOption,
} from "../types/tool-command";
import { Option } from "commander";
import { OptionFactory } from "../commander-wrapper/OptionFactory";

export class ExecutableToolCommandOption implements Executable {
  private command: ToolCommandOption;
  public name: string;

  constructor(toolCommand: ToolCommandOption) {
    this.command = toolCommand;
    this.name = toolCommand.name;
  }

  private optionsForParams(toolOption: ToolOption): Option[] {
    return toolOption.params!.map((p) => {
      p.description = `-> option: ${toolOption.name} - ${p.description}`
      return OptionFactory.option(p);
    });
  }

  private paramOptions(): Option[] {
    const optionsWithParams = this.command.options.filter((o) => o.params);
    return optionsWithParams.reduce(
      (previous, current) => [...previous, ...this.optionsForParams(current)],
      <Option[]>[]
    );
  }

  public build(): Option[] {
    return [OptionFactory.option(this.command), ...this.paramOptions()];
  }

  private constructRunInput(
    toolOption: ToolOption,
    cmdsAndOpts: Record<string, string>
  ) {
    if (!toolOption.params) return;
    return toolOption.params.reduce(
      (previous, p) =>
        !!cmdsAndOpts[p.name]
          ? { ...previous, [p.inputName]: p.parse(cmdsAndOpts) }
          : previous,
      {}
    );
  }

  public async run(cmdsAndOpts: Record<string, string>, tool: Tool) {
    this.command.options!.forEach(async (o) => {
      if (o.name === cmdsAndOpts[this.command.name]) {
        const inputParam = this.constructRunInput(o, cmdsAndOpts);
        await tool.run(o.runCommand, inputParam);
      }
    });
  }
}
