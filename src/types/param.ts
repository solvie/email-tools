export interface GoogleInputParams {
  userId: string;
}

export interface GetMessagesCLP {
  q?: string;
  labelIds?: string[];
  maxResults?: number;
}

export interface GetMessagesGIP extends GetMessagesCLP, GoogleInputParams {}

export interface ReadSnippetGIP extends GoogleInputParams {
  id: string;
}