import { AxiosResponse } from "axios";
import { IServerResponseFailure } from "../../../api/types";
import { IHighwayPageDto } from "../services/highway.dto";

export interface IHighwayQuerySagaCallResponse {
  response: AxiosResponse<IHighwayPageDto>,
  error: AxiosResponse<IServerResponseFailure>
}