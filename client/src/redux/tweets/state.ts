export enum Loading {
  LOADED = "LOADED",
  LOADING = "LOADING",
  ERROR = "ERROR",
  NEVER = "NEVER",
  SUCCESS = 'SUCCESS'
}
export enum AddForm {
  LOADING = "LOADING",
  ERROR = "ERROR",
  NEVER = "NEVER",
}

export interface ITweet {
  _id: string;
  text: string;
  user: {
    fullname: string;
    username: string;
    avatarUrl: string;
  };
  createdAt : string
}
export interface ITweetsState {
  items: ITweet[];
  loadingStatus: Loading;
  addFormStatus: AddForm;
}
