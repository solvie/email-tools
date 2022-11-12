import {
  Buildable,
  ToolCommandOption,
} from "../types/tool-command";
import { Option } from "commander";

export class BuildableToolCommandOption implements Buildable {
  private command: ToolCommandOption;

  constructor(toolCommand: ToolCommandOption) {
    this.command = toolCommand;
  }

  public build(): Option[] {
    let opts: Option[] = [];
    const options = this.command.options;
    const commandString = `--${this.command.name} <option>`;
    const choices = options.map((o) => o.name);
    const mainOption = new Option(
      commandString,
      this.command.description
    ).choices(choices);
    opts.push(mainOption);
    const optionsWithParams = options.filter((o) => o.params);
    optionsWithParams.forEach((op) => {
      const params = op.params!;
      const paramsAsOpts = params.map(
        (p) => new Option(`--${p.name} <${p.type}>`, p.description)
      );
      opts.push(...paramsAsOpts);
    });
    return opts;
  }
}
