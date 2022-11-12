import {
  ConvertableToCommanderEnum,
  ToolCommandEnum,
  ToolCommandType,
  ToolCommandTypeInput,
} from "../types/tool-command";

export class ToolCommandTypeFactory {
  static make(tcti: ToolCommandTypeInput): ToolCommandType {
    return {
      ...tcti,
      kind: ToolCommandEnum.type,
      convertable: ConvertableToCommanderEnum.baseOption,
    };
  }
}
