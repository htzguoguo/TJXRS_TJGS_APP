import { Lands_Data, Weather_Data } from '../../features/basic_report/components/highway_data';
import { getObjectArrayOrEmpty } from '../../utils/objectUtilis';
import { IHighway } from './types';

export class HighwayFactory {
  private _name: string[];
  private _directions: {};
  public initial_data;

  constructor(data: IHighway, companyId: string) {
    this._name = getObjectArrayOrEmpty(data.num_names, companyId);
    this._directions = data.name_direction;

    this.initial_data = {
      weather: Weather_Data[0],
      name: this.getDefaultName(),
      direction: this.getDefaultDirection(),
      lane: Lands_Data[0],
    }
  }

  static getHighwayNowName(name: string): string {
    if (name && name.length > 0) {
      const strs = name.split('K');
      if (strs && strs.length > 0) {
        const tts = strs[0].split('_');
        if (tts && tts.length > 1) {
          return tts[1];
        }
      }
    }
    return '';
  }

  getDefaultName(): string {
    return this._name && this._name.length > 0 ? this._name[0] : '';
  }

  getDefaultDirection(): string {
    const defaultName = this.getDefaultName();
    if(defaultName.length > 0 &&
      this._directions &&
      this._directions.hasOwnProperty(defaultName)) {
        const items: string[] = this._directions[defaultName];
        if(items && items.length > 0) {
          return items[0]
        }
    }
    return '';  
  }

  getHighwayNames(): string[] {
    return this._name;
  }

  getDirection(name: string): string[] {
    return getObjectArrayOrEmpty(this._directions, name);
  }
}
