export interface GoogleInputParams {
  userId: string;
}

export interface GetMessagesCLP {
  q?: string;
  labelIds?: string[];
  maxResults?: number;
}

export interface BatchModifyCLP {
  ids: string[];
  addLabelIds?: string[];
  removeLabelIds?: string[];
}

export interface GetMessagesGIP extends GetMessagesCLP, GoogleInputParams {}
export interface BatchModifyGIP extends BatchModifyCLP, GoogleInputParams {}

export interface ReadSnippetGIP extends GoogleInputParams {
  id: string;
}
