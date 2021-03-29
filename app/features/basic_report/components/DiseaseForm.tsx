import { Accordion, Body, Button, Card, CardItem, H2, H3, Icon, Input, Item, Picker, Spinner, Text, View } from "native-base";
import React, { useState } from "react";
import { Field, Form, FormSpy } from "react-final-form";
import createDecorator from 'final-form-focus'

import DynamicallySelectedPicker from "react-native-dynamically-selected-picker";
import { Dimensions, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { workloadSelector } from "../selectors";
import { IRoadDefect, IScrollPickerItem, IScrollPickerState } from "../types";
interface IData {
  selectedCategory: string;
}

interface IProps {
  getData: (values: IData) => void
}

const getObjectFirstItemOrEmpty = (col: Object | null | undefined, key: string): string => {

  let result = '';
  if (col && col.hasOwnProperty(key)) {
    const arr = col[key];
    if (arr && arr.length > 0) {
      result = arr[0];
    }
  }
  return result;
}

const getObjectArrayOrEmpty = (col: Object | null | undefined, key: string): IScrollPickerItem[] => {

  let result: IScrollPickerItem[] = [];
  if (col && col.hasOwnProperty(key)) {
    const arr = col[key];
    if (arr && arr.length > 0) {
      result = arr.map(item => ({ label: item, value: item }));
    }
  }
  return result;
}

const getArrayFirstItemOrEmpty = (col: string[] | null | undefined) => {
  
  if (col && col.length > 0) {
    return col[0];
  }
  return '';
}

const getArrayOrEmpty = (col: string[] | null | undefined): IScrollPickerItem[] => {
  let result: IScrollPickerItem[] = [];
  if (col) {
    const arr = col;
    if (arr && arr.length > 0) {
      result = arr.map(item => ({ label: item, value: item }));
    }
  }
  return result;
}

const getDefectArrayOrEmpty = (col: Object | null | undefined, key: string): IRoadDefect[] => {
  let result: IRoadDefect[] = [];
  if (col && col.hasOwnProperty(key)) {
    const arr = col[key];
    if (arr && arr.length > 0) {
      result = arr.map(item => {
        //const str: string[] = item.split(",");
        const obj = item;
        return {
          dealwithdesc: obj.DealWithDesc ? obj.DealWithDesc : '',
          unit: obj.MonitoringUnit ? obj.MonitoringUnit : '',
          amount: 0,
          length: 0,
          width: 0,
          depth: 0,
          standard: obj.RegistStandard ? obj.RegistStandard : '',
          associate: obj.AssociateUsersID ? obj.AssociateUsersID : '',
        }
      });
    }
  }
  return result;
}



let focusOnError = createDecorator()
export const DiseaseForm = (props: IProps) => {
  const windowWidth = Dimensions.get("window").width / 4;
  const workloads = useSelector(workloadSelector);
  
  const [selectedCategory, setSelectedCategory] = useState<string>(getArrayFirstItemOrEmpty(workloads.category));

  const [selectedSuboption, setSelectedSuboption] = useState(getObjectFirstItemOrEmpty(workloads.parent_category, selectedCategory));

  const [selectedInspection, setSelectedInspection] = useState(getObjectFirstItemOrEmpty(workloads.subname, `${selectedCategory}-${selectedSuboption}`));

  const [selectedDamage, setSelectedDamage] = useState(getObjectFirstItemOrEmpty(workloads.viewresult, `${selectedCategory}-${selectedSuboption}-${selectedInspection}`));
  
  const category_data = getArrayOrEmpty(workloads.category);
  const suboption_data = getObjectArrayOrEmpty(workloads.parent_category, selectedCategory);
  const inspection_data = getObjectArrayOrEmpty(workloads.subname, `${selectedCategory}-${selectedSuboption}`);
  const damage_data = getObjectArrayOrEmpty(workloads.viewresult, `${selectedCategory}-${selectedSuboption}-${selectedInspection}`);
  const defect_data = getDefectArrayOrEmpty(workloads.dealwith, `${selectedCategory}-${selectedSuboption}-${selectedInspection}-${selectedDamage}`);
  const render_road_defect_item = (item: IRoadDefect) => {
    return (
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
              <Text style={{ textAlign: "center", fontSize: 8 }}>
                {item.dealwithdesc}
              </Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ textAlign: "center", fontSize: 8 }}>
                {item.amount}
              </Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ textAlign: "center", fontSize: 8 }}>
                {item.unit}
              </Text>
            </View>
          </View>
        </Body>
      </CardItem>
    );
  };

  // props.getData({ selectedCategory })
  return (

    <Card style={styles.record_item}>
      <CardItem header bordered>
        <Text>病害信息</Text>
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
              <Text style={{ textAlign: "center" }}>类别</Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ textAlign: "center" }}>分项名称</Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ textAlign: "center" }}>巡查项目</Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ textAlign: "center" }}>损坏情况</Text>
            </View>
          </View>
        </Body>
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
              <DynamicallySelectedPicker
                items={category_data}
                transparentItemRows={1}
                initialSelectedIndex={0}
                onScroll={({ index, item }) => {
                
                  const cur_category = item.value;
                  const cur_suboption = getObjectFirstItemOrEmpty(workloads.parent_category, cur_category);
                  const cur_inspection = getObjectFirstItemOrEmpty(workloads.subname, `${cur_category}-${cur_suboption}`)
                  const cur_damage = getObjectFirstItemOrEmpty(workloads.viewresult, `${cur_category}-${cur_suboption}-${cur_inspection}`)

                  setSelectedCategory(item.value);
                  setSelectedSuboption(cur_suboption)
                  setSelectedInspection(cur_inspection)
                  setSelectedDamage(cur_damage)
                }}
                height={130}
                width={windowWidth}
                fontSize={15}
              />
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <DynamicallySelectedPicker
                items={suboption_data}
                initialSelectedIndex={0}
                transparentItemRows={1}
                onScroll={({ index, item }) => {

                  const cur_category = selectedCategory;
                  const cur_suboption = item.value;
                  const cur_inspection = getObjectFirstItemOrEmpty(workloads.subname, `${cur_category}-${cur_suboption}`)
                  const cur_damage = getObjectFirstItemOrEmpty(workloads.viewresult, `${cur_category}-${cur_suboption}-${cur_inspection}`)

                  setSelectedSuboption(cur_suboption)
                  setSelectedInspection(cur_inspection)
                  setSelectedDamage(cur_damage)
                }}
                height={130}
                width={windowWidth}
                fontSize={15}
              />
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <DynamicallySelectedPicker
                items={inspection_data}
                initialSelectedIndex={0}
                transparentItemRows={1}
                onScroll={({ index, item }) => {
                  const cur_category = selectedCategory;
                  const cur_suboption = selectedSuboption;
                  const cur_inspection = item.value;
                  const cur_damage = getObjectFirstItemOrEmpty(workloads.viewresult, `${cur_category}-${cur_suboption}-${cur_inspection}`)

                  setSelectedInspection(cur_inspection)
                  setSelectedDamage(cur_damage)
                }}
                height={130}
                width={windowWidth}
                fontSize={15}
              />
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <DynamicallySelectedPicker
                items={damage_data}
                initialSelectedIndex={0}
                transparentItemRows={1}
                onScroll={({ index, item }) => {
                  setSelectedDamage(item.value);
                }}
                height={130}
                width={windowWidth}
                fontSize={15}
              />
            </View>
          </View>
        </Body>
      </CardItem>
      <CardItem header bordered>
        <Text>预估工程量</Text>
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
              <Text style={{ textAlign: "center" }}>病害位置</Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ textAlign: "center" }}>分项名称</Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ textAlign: "center" }}>病害描述</Text>
            </View>
          </View>
        </Body>
      </CardItem>
      {defect_data.map((item) => render_road_defect_item(item))}
    </Card>
  )

}

const styles = StyleSheet.create({
  record_item: {
    marginTop: 5,
  },
});


