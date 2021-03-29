import { AxiosResponse } from "axios";
import { IServerResponseFailure } from "../../../api/types";
import { IStationPageDto } from "../services/station.dto";

export interface IStationQuerySagaCallResponse {
  response: AxiosResponse<IStationPageDto>,
  error: AxiosResponse<IServerResponseFailure>
}