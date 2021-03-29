import { AxiosResponse } from "axios";
import { IServerResponseFailure } from "../../../api/types";
import { IBridgePageDto } from "../services/bridge.dto";

export interface IBridgeQuerySagaCallResponse {
  response: AxiosResponse<IBridgePageDto>,
  error: AxiosResponse<IServerResponseFailure>
}