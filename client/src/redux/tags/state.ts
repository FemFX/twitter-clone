export enum Loading {
  LOADED = "LOADED",
  LOADING = "LOADING",
  ERROR = "ERROR",
  NEVER = "NEVER",
}

export interface ITag {
  _id: string;
  name: string;
  count: number;
}
export interface ITagState {
  items: ITag[];
  loadingStatus: Loading;
}
