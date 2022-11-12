import {
  ConvertableToCommanderEnum,
  ToolParam,
  ToolParamInput,
} from "../types/tool-command";

export class ToolParamFactory {
  static make(tpi: ToolParamInput): ToolParam {
    return {
      ...tpi,
      convertable: ConvertableToCommanderEnum.baseOption,
    };
  }
}
