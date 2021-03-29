import { IStationSelectorData } from "./components/StationForm";

export function getStationSummary(data: IStationSelectorData): string {
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
    return `${stationType}:${value}`
}



