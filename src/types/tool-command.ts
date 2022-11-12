import { EmailTool } from "../email-tool";

export type ToolCommand = ToolCommandOption | ToolCommandType;

export interface Named {
  name: string;
  description: string;
}

export interface ToolCommandOption extends Named {
  kind: "ToolCommandOption";
  options: ToolOption[];
}

export interface ToolCommandType extends Named {
  kind: "ToolCommandType";
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
