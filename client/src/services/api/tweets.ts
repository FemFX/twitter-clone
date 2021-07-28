import { axios } from "../../core/axios";
import { ITweet } from "../../redux/tweet/state";

interface Response<T> {
  status: string;
  data: T;
}

export const TweetsApi = {
  async fetchTweets(): Promise<ITweet[]> {
    const { data } = await axios.get<Response<ITweet[]>>("/tweets");
    return data.data;
  },
  async fetchTweet(id: string): Promise<ITweet> {
    const { data } = await axios.get<Response<ITweet>>(`/tweets/${id}`);
    return data.data;
  },
  async addTweet(payload: { text: string; images: string[] }): Promise<ITweet> {
    const { data } = await axios.post<Response<ITweet>>("/tweets", payload);
    return data.data;
  },
  async removeTweet(id: string): Promise<void> {
    await axios.delete<Response<ITweet>>(`/tweets/${id}`);
  },
};
