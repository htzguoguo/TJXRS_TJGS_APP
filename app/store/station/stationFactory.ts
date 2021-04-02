import { getObjectArrayOrEmpty, getObjectFirstItemOrEmpty } from '../../utils/objectUtilis';
import { HighwayFactory } from '../highway/highwayFactory';
import { IStationSubName } from './types';

export class StationFactory {
  private _names: {};  


  constructor(data: IStationSubName) {
    this._names = data.names_station; 
  } 

  public getDefaultData(highway: string) {
    return {
      stationType: '道路桩号',
      kilometer: '0',
      meter: '0',
      endkilometer: '0',
      endmeter: '0',
      station: this.getDefaultStation(highway),      
      stationOther: '',
    }
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
 

