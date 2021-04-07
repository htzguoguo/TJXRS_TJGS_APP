import { IRoadDefect } from './../../store/workload/types';
import { IStationSelectorData } from "./components/StationForm";

export function getFirstAvalibleDefect(items: IRoadDefect[]): IRoadDefect | undefined {
  let found: IRoadDefect | undefined = undefined;
  if(items && items.length > 0) {
    found = items.find(item => item.amount > 0)
    if(!found) {
      found = items[0];
    } 
  }
  return found;
}

export function getStationSummary(data: IStationSelectorData, isPrefix: boolean = true): string {
  const stationType: string = data.stationType;
  let value= '';
    if (stationType === '道路桩号' || stationType === '联络线') {
      value = `K${data.kilometer}+${data.meter}`;
    } else if (stationType === '区间') {
      value = `K${data.kilometer}+${data.meter}-K${data.endkilometer}+${data.endmeter}`;
    } else if (stationType === '桥梁匝道') {
      value = `${data.subname}`;
    } else if (stationType === '站区') {
      value = `${data.station}`;
    }
    else if (stationType === '其它') {
      value = `${data.stationOther}`;
    }
    if(isPrefix) {
return `${stationType}:${value}`
    }
    return `${value}`
}



