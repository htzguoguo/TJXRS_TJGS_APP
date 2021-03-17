import { AxiosResponse } from "axios";
import { IServerResponseFailure } from "../../../api/types";
import { IWorkloadPageDto } from "../services/workload.dto";

export interface IWorkloadQueryLoginSagaCallResponse {
  response: AxiosResponse<IWorkloadPageDto>,
  error: AxiosResponse<IServerResponseFailure>
}