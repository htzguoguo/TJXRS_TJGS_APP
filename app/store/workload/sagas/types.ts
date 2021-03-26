import { AxiosResponse } from "axios";
import { IServerResponseFailure } from "../../../api/types";
import { IWorkloadPageDto } from "../services/workload.dto";

export interface IWorkloadQuerySagaCallResponse {
  response: AxiosResponse<IWorkloadPageDto>,
  error: AxiosResponse<IServerResponseFailure>
}