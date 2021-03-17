import { AxiosResponse } from "axios";
import { IServerResponseFailure } from "../../../api/types";
import { ILoginSuccessResponse } from "../models";

export interface ILoginSagaCallResponse {
  response: AxiosResponse<ILoginSuccessResponse>,
  error: AxiosResponse<IServerResponseFailure>
}