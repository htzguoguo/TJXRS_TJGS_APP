import { getObjectArrayOrEmpty, getObjectFirstItemOrEmpty } from '../../utils/objectUtilis';
import { HighwayFactory } from '../highway/highwayFactory';
import { IStationSubName } from './types';

export class StationFactory {
  private _names: {};  

  constructor(data: IStationSubName) {
    this._names = data.names_station;    
  } 

  public getDefaultStation(name: string) {
    const now_name = HighwayFactory.getHighwayNowName(name);
    return getObjectFirstItemOrEmpty(this._names, now_name)
  } 

  getStations(name: string): string[] {
    const now_name = HighwayFactory.getHighwayNowName(name);
    return getObjectArrayOrEmpty(this._names, now_name);
  }
}
 

