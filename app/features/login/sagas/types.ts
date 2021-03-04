import { AxiosResponse } from "axios";
import { IServerResponseFailure } from "../../../api/types";
import { ILoginResponse } from "../models";

export interface ILoginSagaCallResponse {
  response: AxiosResponse<ILoginResponse>,
  error: AxiosResponse<IServerResponseFailure>
}