import { HttpStatus } from "../config/http_status.enum";

export interface IServerResponseFailure {
  statusCode: HttpStatus;
  timestamp: Date;
  path: string;
  error: string;
}
