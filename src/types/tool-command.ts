import { Option } from "commander";
import { EmailTool } from "../email/email-tool";

export type ToolCommand = ToolCommandOption | ToolCommandType;

export enum ToolCommandEnum {
  option = "Option",
  type = "Type",
}

export enum ConvertableToCommanderEnum {
  optionWithChoices = "ToolCommandOption",
  baseOption = "BaseOption",
}

export interface Buildable {
  build: () => Option[];
}

export interface Runnable {
  run: (cmdsAndOpts: Record<string, string>) => Promise<void>;
}

export interface ConvertableToCommanderOption {
  convertable: ConvertableToCommanderEnum;
}

export interface Named {
  name: string;
  description: string;
}

export interface ToolCommandBase extends Named {}

export interface ToolCommandOption
  extends ToolCommandBase,
    ConvertableToCommanderOption {
  kind: ToolCommandEnum.option;
  convertable: ConvertableToCommanderEnum.optionWithChoices;
  options: ToolOption[];
}

export interface ToolCommandType
  extends ToolCommandBase,
    ConvertableToCommanderOption {
  kind: ToolCommandEnum.type;
  convertable: ConvertableToCommanderEnum.baseOption;
  type: string;
  execute: (emailTools: EmailTool, params?: any) => Promise<void>;
}

export interface ToolOption extends Named {
  params?: ToolParam[];
  execute: (emailTools: EmailTool, params?: any) => Promise<void>;
}

export interface ToolParam extends Named, ConvertableToCommanderOption {
  inputName: string;
  convertable: ConvertableToCommanderEnum.baseOption;
  type: string;
}

export type BaseOptionable = ToolParam | ToolCommandType;
