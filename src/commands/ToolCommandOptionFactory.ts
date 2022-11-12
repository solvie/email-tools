import {
  ConvertableToCommanderEnum,
  ToolCommandEnum,
  ToolCommandOption,
  ToolCommandOptionInput,
} from "../types/tool-command";

export class ToolCommandOptionFactory {
  static make(tcoi: ToolCommandOptionInput): ToolCommandOption {
    return {
      ...tcoi,
      kind: ToolCommandEnum.option,
      convertable: ConvertableToCommanderEnum.optionWithChoices,
    };
  }
}
