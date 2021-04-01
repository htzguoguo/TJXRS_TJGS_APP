import { Body, CardItem, Icon, Left, Right, Text, View } from "native-base"

import React from "react"
import { StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import {
  mock_reports,
} from "../mock_data";
import { IReportBasicInfo } from "../model";
import { reportSelector } from "../selectors";
import basic_styles from '../styles';

interface IProps {
  setSelected: (item: IReportBasicInfo) => void
}

export const ReportList = (comProps: IProps) => {
  const reports = useSelector(reportSelector);
  const render_basic_info_item = (item: IReportBasicInfo) => {
    return (
      <CardItem bordered>
        <Body
        >

          <View
            key={item.caseId}
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <TouchableOpacity onPress={() => comProps.setSelected(item)}>
                <Text style={{ textAlign: "center", fontSize: 12 }}>
                  {item.caseId}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ textAlign: "center", fontSize: 12 }}>
                {item.lane}
              </Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ textAlign: "center", fontSize: 12 }}>
                {item.category}
              </Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ textAlign: "center", fontSize: 12 }}>
                {item.suboption}
              </Text>
            </View>
          </View>

        </Body>
      </CardItem>
    );
  };
  return (
    <View style={[styles.view_container, { marginBottom: 5 }]}>
      <CardItem header bordered>
        <Text>上报信息</Text>
      </CardItem>
      <CardItem bordered>
        <Body>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ textAlign: "center" }}>案件编号</Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ textAlign: "center" }}>车道</Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ textAlign: "center" }}>类别</Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ textAlign: "center" }}>分项名称</Text>
            </View>
          </View>
        </Body>
      </CardItem>
      {reports.map((item) => render_basic_info_item(item))}
    </View>
  )
}

const styles = StyleSheet.create({
  ...basic_styles,

});


