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
  private options: ToolOption[];
  public name: string;

  constructor(toolCommand: ToolCommandOption) {
    this.command = toolCommand;
    this.options = toolCommand.options;
    this.name = toolCommand.name;
  }

  private optionsForParams(toolOption: ToolOption): Option[] {
    return toolOption.params!.map((p) => {
      p.description = `-> option: ${toolOption.name} - ${p.description}`;
      return OptionFactory.option(p);
    });
  }

  private paramOptions(): Option[] {
    const optionsWithParams = this.options.filter((o) => o.params);
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
    return toolOption.params.reduce((previous, p) => {
      const parsed = p.parse(cmdsAndOpts);
      const updatedInput = { ...previous };
      if (parsed !== undefined) updatedInput[p.inputName] = parsed;
      return updatedInput;
    }, {});
  }

  public async run(cmdsAndOpts: Record<string, string>, tool: Tool) {
    const chosen = this.options!.find((o) => o.name === cmdsAndOpts[this.name]);
    const inputParam = this.constructRunInput(chosen!, cmdsAndOpts);
    await tool.run(chosen!.runCommand, inputParam);
  }
}
