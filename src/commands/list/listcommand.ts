import { ToolCommandOption, ToolCommandOptionInput } from "../../types/tool-command";
import { toolCommandOptionMaker } from "../converters";
import { ToolCommandMaker } from "../ToolCommandMaker";
import { ListEmailOption } from "./option/email";
import { ListLabelOption } from "./option/label";

export const ListCommand = ToolCommandMaker.make<
  ToolCommandOptionInput,
  ToolCommandOption
>(toolCommandOptionMaker, {
  name: "list",
  description: "list objects",
  options: [ListEmailOption, ListLabelOption],
});
