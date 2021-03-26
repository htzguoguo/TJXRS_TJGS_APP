import { IStoreState } from "../types";
import { highwayFactory } from "./highwayFactory";

export const highwaySelector = (state: IStoreState) => {
  return new highwayFactory(state.highwayReducer.highway, state.loginReducer.user?.companyId!);
};