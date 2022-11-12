import { Runnable, ToolCommand, ToolCommandEnum } from "../types/tool-command";
import { RunnableToolCommandOption } from "./RunnableToolCommandOption";
import { RunnableToolCommandType } from "./RunnableToolCommandType";

export class ToolCommandRunnerFactory {
  public createRunnable(command: ToolCommand): Runnable {
    switch (command.kind) {
      case ToolCommandEnum.option:
        return new RunnableToolCommandOption(command);
      case ToolCommandEnum.type:
        return new RunnableToolCommandType(command);
    }
  }
}
