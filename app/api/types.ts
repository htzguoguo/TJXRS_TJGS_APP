import { HttpStatus } from "../config/http_status.enum";

export interface IServerResponseFailure {
  statusCode: HttpStatus;
  timestamp: Date;
  path: string;
  error: string;
}

export interface IQueryResponseState<T> {
  type: String;
  response: T;
}
