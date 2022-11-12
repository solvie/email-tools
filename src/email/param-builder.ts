import {
  GetMessagesCLP,
  GetMessagesGIP,
  GoogleInputParams,
  ReadSnippetGIP,
} from "../types/param";

export class ParamBuilder {
  static readonly AUTHORIZED_USER = "me";
  static readonly DEFAULT_MAX_EMAILS = 10;

  public static baseInputParams(): GoogleInputParams {
    return {
      userId: this.AUTHORIZED_USER,
    };
  }

  public static emailParams(inputParams: GetMessagesCLP): GetMessagesGIP {
    return {
      ...this.baseInputParams(),
      maxResults: this.DEFAULT_MAX_EMAILS,
      ...inputParams,
    };
  }

  public static readSnippetParams(id: string): ReadSnippetGIP {
    return {
      ...this.baseInputParams(),
      id,
    };
  }
}
