import {
  ConvertableToCommanderEnum,
  ToolCommandEnum,
  ToolCommandOption,
  ToolCommandOptionInput,
  ToolCommandType,
  ToolCommandTypeInput,
  ToolParam,
  ToolParamInput,
} from "../types/tool-command";

export function toolCommandOptionMaker(
  tcoi: ToolCommandOptionInput
): ToolCommandOption {
  return {
    ...tcoi,
    kind: ToolCommandEnum.option,
    convertable: ConvertableToCommanderEnum.optionWithChoices,
  };
}

export function toolParamMaker(tpi: ToolParamInput): ToolParam {
  const parseParam = (cmdsAndOpts: Record<string, string>) => {
    const foundParam = cmdsAndOpts[tpi.name];
    if ((tpi.required && foundParam === undefined) || foundParam === null) {
      throw new Error(`Required param '${tpi.name}' was not found.`);
    }
    if (foundParam === undefined) return;
    if (tpi.type === "string") return foundParam;
    if (tpi.type === "string[]") return JSON.parse(foundParam);
    if (tpi.type === "number") return Number.parseInt(foundParam);
  };
  return {
    ...tpi,
    convertable: ConvertableToCommanderEnum.baseOption,
    parse: parseParam,
  };
}

export function toolCommandTypeMaker(
  tcti: ToolCommandTypeInput
): ToolCommandType {
  return {
    ...tcti,
    kind: ToolCommandEnum.type,
    convertable: ConvertableToCommanderEnum.baseOption,
  };
}
