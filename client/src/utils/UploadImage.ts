import { axios } from "../core/axios";

interface IUploadImageprops {
  url: string;
  size: number;
  width: number;
  height: number;
}

export const uploadImage = async (image: any): Promise<IUploadImageprops> => {
  const formData = new FormData();
  formData.append("avatar", image);
  const { data } = await axios.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
