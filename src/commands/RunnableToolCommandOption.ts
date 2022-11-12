import { Runnable, Tool, ToolCommandOption, ToolOption } from "../types/tool-command";

export class RunnableToolCommandOption implements Runnable {
  private command: ToolCommandOption;

  constructor(toolCommand: ToolCommandOption) {
    this.command = toolCommand;
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
