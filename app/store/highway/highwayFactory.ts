import { getObjectArrayOrEmpty } from '../../utils/objectUtilis';
import { IHighway } from './types';

export class HighwayFactory {
  private _name: string[];
  private _directions: {};

  constructor(data: IHighway, companyId: string) {
    this._name = getObjectArrayOrEmpty(data.num_names, companyId);
    this._directions = data.name_direction;
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
