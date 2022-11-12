import { Executable, Tool, ToolCommandOption, ToolOption } from "../types/tool-command";
import { Option } from "commander";
import { OptionFactory } from "../commander-wrapper/OptionFactory";

export class BuildableToolCommandOption implements Executable {
  private command: ToolCommandOption;
  public name: string;

  constructor(toolCommand: ToolCommandOption) {
    this.command = toolCommand;
    this.name = toolCommand.name;
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

  private constructInputParam(
    toolOption: ToolOption,
    cmdsAndOpts: Record<string, string>
  ) {
    if (!toolOption.params) return;
    return toolOption.params.reduce(
      (previous, p) =>
        !!cmdsAndOpts[p.name]
          ? { ...previous, [p.inputName]: cmdsAndOpts[p.name] }
          : previous,
      {}
    );
  }

  public async run(cmdsAndOpts: Record<string, string>, tool: Tool) {
    this.command.options!.forEach(async (o) => {
      if (o.name === cmdsAndOpts[this.command.name]) {
        const inputParam = this.constructInputParam(o, cmdsAndOpts);
        await tool.run(o.runCommand, inputParam);
      }
    });
  }
}
