import { EmailTool } from "../email-tool";

export type ToolCommand = ToolCommandOption | ToolCommandType;

export enum ToolCommandEnum {
  option = "Option",
  type = "Type",
}

export interface Named {
  name: string;
  description: string;
}

export interface ToolCommandOption extends Named {
  kind: ToolCommandEnum.option;
  options: ToolOption[];
}

export interface ToolCommandType extends Named {
  kind: ToolCommandEnum.type;
  type: string;
  execute: (emailTools: EmailTool, params?: any) => Promise<void>;
}

interface ToolOption extends Named {
  params?: ToolParam[];
  execute: (emailTools: EmailTool, params?: any) => Promise<void>;
}

interface ToolParam extends Named {
  inputName: string;
  type: string;
}
