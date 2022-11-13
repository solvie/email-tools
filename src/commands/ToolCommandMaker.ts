import { MakerInput, MakerProduct } from "../types/tool-command";

export class ToolCommandMaker {
  public static make<T extends MakerInput, K extends MakerProduct>(
    converter: (input: T) => K,
    input: T
  ): K {
    return converter(input);
  }
}
