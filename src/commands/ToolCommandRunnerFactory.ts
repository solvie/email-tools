import { EmailTool } from "../email-tool";
import { ToolCommand, ToolCommandEnum } from "../types/tool-command";
import { RunnableToolCommandOption } from "./RunnableToolCommandOption";
import { RunnableToolCommandType } from "./RunnableToolCommandType";

export class ToolCommandRunnerFactory {
  private emailTool: EmailTool;

  constructor(emailTool: EmailTool) {
    this.emailTool = emailTool;
  }

  public createRunnable(command: ToolCommand): Runnable {
    switch (command.kind) {
      case ToolCommandEnum.option:
        return new RunnableToolCommandOption(command, this.emailTool);
      case ToolCommandEnum.type:
        return new RunnableToolCommandType(command, this.emailTool);
    }
  }
}
