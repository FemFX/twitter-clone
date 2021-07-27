import axios from "axios";
import { ITagState } from "../../redux/tags/state";

export const TagsApi = {
  fetchTags(): Promise<ITagState["items"]> {
    return axios
      .get("/tags")
      .then(({ data }) => data);
  },
};
