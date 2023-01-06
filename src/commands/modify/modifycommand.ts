import { ToolCommandOption, ToolCommandOptionInput } from "../../types/tool-command";
import { toolCommandOptionMaker } from "../converters";
import { ToolCommandMaker } from "../ToolCommandMaker";
import { ModifyEmailOption } from "./option/email";

export const ModifyCommand = ToolCommandMaker.make<
  ToolCommandOptionInput,
  ToolCommandOption
>(toolCommandOptionMaker, {
  name: "modify",
  description: "modify objects",
  options: [ModifyEmailOption],
});