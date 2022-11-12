import { Runnable, ToolCommandType } from "../types/tool-command";
import { EmailTool } from "../email-tool";

export class RunnableToolCommandType implements Runnable {
  private command: ToolCommandType;
  private emailTool: EmailTool;

  constructor(toolCommand: ToolCommandType, emailTool: EmailTool) {
    this.command = toolCommand;
    this.emailTool = emailTool;
  }

  public async run(cmdsAndOpts: Record<string, string>) {
    const name = this.command.name;
    const required = cmdsAndOpts[name];
    await this.command.execute(this.emailTool, required);
  }
}
