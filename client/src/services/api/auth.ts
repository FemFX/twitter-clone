import { axios } from "../../core/axios";
import { ILoginFormProps } from "../../pages/component/Login";
import { IRegisterFormProps } from "../../pages/component/Register";

interface Response<T> {
  status: string;
  data: T;
}

export const AuthApi = {
  async signIn(formData: ILoginFormProps): Promise<any> {
    const { data } = await axios.post<Response<any>>("/auth/login", {
      username: formData.username,
      password: formData.password,
    });
    return data;
  },
  async signUp(formData: IRegisterFormProps): Promise<any> {
    const { data } = await axios.post<Response<any>>("/auth/register", {
      fullname: formData.fullname,
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });
    return data;
  },
  async getMe(): Promise<any> {
    const { data } = await axios.get<Response<any>>("/users/me");
    return data;
  },
};

// @ts-ignore
window.AuthApi = AuthApi;
