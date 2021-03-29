import { IStoreState } from "../types";
import { StationFactory } from "./stationFactory";

export const stationSelector = (state: IStoreState) => {
  return new StationFactory(state.stationReducer.station);
};