import { Option } from "commander";

export type ToolCommand = ToolCommandOption | ToolCommandType;

export enum ToolCommandEnum {
  option = "Option",
  type = "Type",
}

export enum ConvertableToCommanderEnum {
  optionWithChoices = "ToolCommandOption",
  baseOption = "BaseOption",
}

export enum COMMANDS {
  listLabels = "LIST_LABELS",
  listEmails = "LIST_EMAILS",
  readEmail = "READ_EMAIL",
}

export interface Tool {
  run: (command: COMMANDS, params: any) => Promise<void>;
}

export interface Buildable {
  build: () => Option[];
}

export interface Runnable {
  run: (cmdsAndOpts: Record<string, string>, tool: Tool) => Promise<void>;
}

export interface Executable extends Buildable, Runnable {
  name: string;
}

export interface Parseable {
  parse: (cmdsAndOpts: Record<string, string>) => Record<string, string>;
}

export interface ConvertableToCommanderOption {
  convertable: ConvertableToCommanderEnum;
}

export interface Named {
  name: string;
  description: string;
}

export interface ToolCommandExecutable extends Named {
  runCommand: COMMANDS;
}

export interface ToolCommandOptionInput extends Named {
  options: ToolOption[];
}

export interface ToolCommandOption extends ToolCommandOptionInput {
  kind: ToolCommandEnum.option;
  convertable: ConvertableToCommanderEnum.optionWithChoices;
}

export interface ToolCommandTypeInput extends ToolCommandExecutable {
  type: string;
}

export interface ToolCommandType
  extends ToolCommandTypeInput,
    ConvertableToCommanderOption {
  kind: ToolCommandEnum.type;
  convertable: ConvertableToCommanderEnum.baseOption;
}

export interface ToolOption extends ToolCommandExecutable {
  params?: ToolParam[];
}

export interface ToolParamInput extends Named {
  inputName: string;
  type: string;
}

export interface ToolParam
  extends ToolParamInput,
    ConvertableToCommanderOption,
    Parseable {
  convertable: ConvertableToCommanderEnum.baseOption;
}

export type BaseOptionable = ToolParam | ToolCommandType;

export type MakerInput =
  | ToolCommandTypeInput
  | ToolCommandOptionInput
  | ToolParamInput;
export type MakerProduct = ToolCommandType | ToolCommandOption | ToolParam;
