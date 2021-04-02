import {
  getObjectArrayOrEmpty,
  getObjectFirstItemOrEmpty,
} from '../../utils/objectUtilis';
import { HighwayFactory } from '../highway/highwayFactory';
import { IBridgeSubName } from './types';

export class BridgeFactory {
  private _names: {};
  private _bridges: {};
  private _companyId: string;

  constructor(data: IBridgeSubName, companyId: string) {
    this._names = data.names_range;
    this._bridges = data.range_bridge;
    this._companyId = companyId;
  }

  getDefaultData(roadName: string) {
    return {
      staterange: this.getDefaultStationRange(roadName),
      subname: this.getDefaultSubName(roadName),
    };
  }

  getDefaultStationRange(name: string): string {
    const now_name = HighwayFactory.getHighwayNowName(name);
    return getObjectFirstItemOrEmpty(
      this._names,
      `${now_name}-${this._companyId}`,
    );
  }

  getDefaultSubName(name: string): string {
    const now_name = HighwayFactory.getHighwayNowName(name);
    const defaultRangeName = this.getDefaultStationRange(name);

    return getObjectFirstItemOrEmpty(
      this._bridges,
      `${now_name}-${defaultRangeName}-${this._companyId}`,
    );
  }

  getStationRanges(name: string): string[] {
    const now_name = HighwayFactory.getHighwayNowName(name);
    return getObjectArrayOrEmpty(this._names, `${now_name}-${this._companyId}`);
  }

  getSubNames(name: string, range: string): string[] {
    const now_name = HighwayFactory.getHighwayNowName(name);
    return getObjectArrayOrEmpty(
      this._bridges,
      `${now_name}-${range}-${this._companyId}`,
    );
  }
}
