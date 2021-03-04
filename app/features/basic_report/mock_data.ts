import {IReportBasicInfo, IScrollPickerItem, IRoadDefect} from "./types";

export const mock_reports: IReportBasicInfo[] = [
  {
    caseid: "S1-A-20140526-1053",
    lane: "中央隔离带",
    subject: "二波钢护栏",
    category: "交通设施",
  },
  {
    caseid: "S1-A-20140526-1054",
    lane: "路缘带",
    subject: "车辙",
    category: "路面",
  },
  {
    caseid: "S1-A-20140526-1055",
    lane: "中央隔离带",
    subject: "碎石",
    category: "路基",
  },
  {
    caseid: "S1-A-20140526-1056",
    lane: "路缘带",
    subject: "吊顶",
    category: "桥梁隧道",
  },
  {
    caseid: "S1-A-20140526-1057",
    lane: "路缘带",
    subject: "单项",
    category: "交通设施",
  },
  {
    caseid: "S1-A-20140526-1058",
    lane: "路缘带",
    subject: "车辙",
    category: "路基",
  },
  {
    caseid: "S1-A-20140526-1059",
    lane: "路缘带",
    subject: "二波钢护栏",
    category: "交通设施",
  },
];

export const mock_category: IScrollPickerItem[] = [
  {
    value: "路面",
    label: "路面",
  },
  {
    value: "路基",
    label: "路基",
  },
  {
    value: "桥涵隧道",
    label: "桥涵隧道",
  },
  {
    value: "专项工程",
    label: "专项工程",
  },
];

export const mock_sub_option: IScrollPickerItem[] = [
  {
    value: "路面病害",
    label: "路面病害",
  },
  {
    value: "中央分隔带",
    label: "中央分隔带",
  },
  {
    value: "固定项",
    label: "固定项",
  },
];

export const mock_Inspection: IScrollPickerItem[] = [
  {
    value: "机械清扫",
    label: "机械清扫",
  },
  {
    value: "机械清扫",
    label: "机械清扫",
  },
  {
    value: "路况巡查",
    label: "路况巡查",
  },
];

export const mock_Damage: IScrollPickerItem[] = [
  {
    value: "缺损",
    label: "缺损",
  },
  {
    value: "杂草",
    label: "杂草",
  },
  {
    value: "杂物",
    label: "杂物",
  },
];

export const mock_road_defects: IRoadDefect[] = [
  {
    position: "K60+910",
    name: "更换边网金属立柱",
    desc: "边网金属立柱,损坏,2 根",
  },
  {
    position: "K4+920",
    name: "补充立柱柱帽",
    desc: "二波钢护栏(3mm),损坏,18 m",
  },
  {
    position: "K61+280",
    name: "急流槽更换八字石",
    desc: "急流槽八字石,损坏,1 对",
  },
  {
    position: "K61+230",
    name: "急流槽更换八字石",
    desc: "急流槽八字石,损坏,1 对",
  },
];
