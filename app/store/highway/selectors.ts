import { IStoreState } from "../types";
import { HighwayFactory } from "./highwayFactory";

export const highwaySelector = (state: IStoreState) => {
  return new HighwayFactory(state.highwayReducer.highway, state.loginReducer.user?.companyId!);
};