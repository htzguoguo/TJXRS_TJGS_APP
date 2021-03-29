import { IStoreState } from "../types";
import { BridgeFactory } from "./bridgeFactory";

export const bridgeSelector = (state: IStoreState) => {
  return new BridgeFactory(state.bridgeReducer.bridge, state.loginReducer.user?.companyId!);
};