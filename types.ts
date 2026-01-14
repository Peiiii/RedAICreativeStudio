
export interface GeneratedContent {
  title: string;
  caption: string;
  tags: string[];
  imageUrl?: string;
}

export enum AppState {
  LANDING = 'LANDING',
  CREATING = 'CREATING',
  GENERATING = 'GENERATING',
  PREVIEW = 'PREVIEW'
}

export interface GenerationParams {
  prompt: string;
  image?: string; // base64
}
