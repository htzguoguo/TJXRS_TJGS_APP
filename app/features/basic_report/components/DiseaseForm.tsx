import { Accordion, Body, Button, Card, CardItem, Container, Content, H2, H3, Header, Icon, Input, Item, Label, Left, Picker, Right, Spinner, Text, Title, View } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { Field, Form, FormSpy } from "react-final-form";
import createDecorator from 'final-form-focus'
import Modal from 'react-native-modal';
import DynamicallySelectedPicker from "react-native-dynamically-selected-picker";
import { Dimensions, StyleSheet, TouchableHighlight } from "react-native";
import { useSelector } from "react-redux";
import { IScrollPickerItem, IScrollPickerState } from "../types";
import { composeValidators, isRequired, mustBeNumber } from "../../../components/validateRules";

import basic_styles from '../styles';
import { IWorkloadItem } from "../../../store/workload/models";
import { workloadSelector } from "../../../store/workload/selectors";
import { IRoadDefect } from "../../../store/workload/types";
import { WorkloadFactory } from "../../../store/workload/workloadFactory";

export interface IDiseaseSelectorData {
  category: string;
  suboption: string;
  inspection: string;
  damage: string;
  defect: IRoadDefect[];
}
interface IProps { 
  //initial_data: IDiseaseSelectorData;
  workload_data: WorkloadFactory;
  category: string;
  suboption: string;
  inspection: string;
  damage: string;
  defect: IRoadDefect[];
  setSelectedCategory: (value: string) => void;
  setSelectedSuboption: (value: string) => void;
  setSelectedInspection: (value: string) => void;
  setSelectedDamage: (value: string) => void;
  setSelectedDefect: (value: IRoadDefect[]) => void;
}

let focusOnError = createDecorator()
export const DiseaseForm = (comProps: IProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEditItem, setSelectedEditItem] = useState<IRoadDefect | null>(null);
  const categoryEl = useRef<DynamicallySelectedPicker>(null);
  const suboptionEl = useRef<DynamicallySelectedPicker>(null);
  const inspectionEl = useRef<DynamicallySelectedPicker>(null);
  const damageEl = useRef<DynamicallySelectedPicker>(null);
  const windowWidth = Dimensions.get("window").width / 4;
  //const workloads = useSelector(workloadSelector);
  const workloads = comProps.workload_data;

  //const initial_data = comProps.initial_data;
  // const [selectedCategory, setSelectedCategory] = useState<string>(comProps.initial_data.category);

  // const [selectedSuboption, setSelectedSuboption] = useState(comProps.initial_data.suboption);

  // const [selectedInspection, setSelectedInspection] = useState(comProps.initial_data.inspection);

  // const [selectedDamage, setSelectedDamage] = useState(comProps.initial_data.damage);

  // const [selectedDefect, setSelectedDefect] = useState(comProps.initial_data.defect);

  useEffect(
    () => {
      // setSelectedCategory(comProps.initial_data.category)
      // setSelectedDefect(workloads.getDefaultDefect(comProps.initial_data.category, comProps.initial_data.suboption, comProps.initial_data.inspection, comProps.initial_data.damage));     
      const category_index = category_data.findIndex(item => item.value === comProps.category)
      //categoryEl.current.setItemIndex(category_index);
      //categoryEl.current.scrollToInitialPosition();
      categoryEl.current.scrollToPosition(category_index);
    },
    [comProps.category]
  )

  useEffect(
    () => {
      // setSelectedSuboption(comProps.initial_data.suboption)   
      // setSelectedDefect(workloads.getDefaultDefect(comProps.initial_data.category, comProps.initial_data.suboption, comProps.initial_data.inspection, comProps.initial_data.damage));        
      const suboption_data = workloads.getsuboption(comProps.category);
      const suboption_index = suboption_data.findIndex(item => item.value === comProps.suboption);
      suboptionEl.current.scrollToPosition(suboption_index);
    },
    [comProps.category, comProps.suboption]
  )

  useEffect(
    () => {
      // setSelectedInspection(comProps.initial_data.inspection) 
      // setSelectedDefect(workloads.getDefaultDefect(comProps.initial_data.category, comProps.initial_data.suboption, comProps.initial_data.inspection, comProps.initial_data.damage));         
      const inspection_data = workloads.getInspection(comProps.category, comProps.suboption);
      const inspection_index = inspection_data.findIndex(item => item.value === comProps.inspection);
      inspectionEl.current.scrollToPosition(inspection_index);
    },
    [comProps.category, comProps.suboption, comProps.inspection]
  )

  useEffect(
    () => {
      // console.log('useEffect setSelectedDamage', comProps.initial_data.damage);
      // setSelectedDefect(workloads.getDefaultDefect(comProps.initial_data.category, comProps.initial_data.suboption, comProps.initial_data.inspection, comProps.initial_data.damage));     
      // setSelectedDamage(comProps.initial_data.damage)   
      const damage_data = workloads.getDamage(comProps.category, comProps.suboption, comProps.inspection);
      const damage_index = damage_data.findIndex(item => item.value === comProps.damage);
      damageEl.current.scrollToPosition(damage_index);
    },
    [comProps.category, comProps.suboption, comProps.inspection, comProps.damage]
  )

  // useEffect(
  //   () => {   
  //     console.log('useEffect setSelectedDefect', comProps.initial_data.defect);  
  //     setSelectedDefect(comProps.initial_data.defect)
  //   },
  //   [comProps.initial_data.defect]
  // )
  // useEffect(() => {
  //   const category_data = workloads.getCategory();
  //   const suboption_data = workloads.getsuboption(comProps.category);
  //   const inspection_data = workloads.getInspection(comProps.category, comProps.suboption);
  //   const damage_data = workloads.getDamage(comProps.category, comProps.suboption, comProps.inspection);
  //   const category_index = category_data.findIndex(item => item.value === comProps.category)
  //   //categoryEl.current.setItemIndex(category_index);
  //   //categoryEl.current.scrollToInitialPosition();
  //   categoryEl.current.scrollToPosition(category_index);

  //   const suboption_index = suboption_data.findIndex(item => item.value === comProps.suboption);
  //   suboptionEl.current.scrollToPosition(suboption_index);

  //   const inspection_index = inspection_data.findIndex(item => item.value === comProps.inspection);
  //   inspectionEl.current.scrollToPosition(inspection_index);

  //   const damage_index = damage_data.findIndex(item => item.value === comProps.damage);
  //   damageEl.current.scrollToPosition(damage_index);
  // });

  const category_data = workloads.getCategory();
  const suboption_data = workloads.getsuboption(comProps.category);
  const inspection_data = workloads.getInspection(comProps.category, comProps.suboption);
  const damage_data = workloads.getDamage(comProps.category, comProps.suboption, comProps.inspection);


  const category_index = category_data.findIndex(item => item.value === comProps.category)
  const suboption_index = suboption_data.findIndex(item => item.value === comProps.suboption);
  const inspection_index = inspection_data.findIndex(item => item.value === comProps.inspection);
  const damage_index = damage_data.findIndex(item => item.value === comProps.damage);
  //
  //categoryEl.current.scrollToInitialPosition();
  console.log(category_index, comProps.category, category_data);
  //const defect_data = getDefectArrayOrEmpty(workloads.dealwith, `${selectedCategory}-${selectedSuboption}-${selectedInspection}-${selectedDamage}`);
  const render_road_defect_item = (form, item: IRoadDefect) => {
    return (
      <CardItem bordered button onPress={
        () => {
          setModalVisible(true);
          setSelectedEditItem(item);
        }
      }>
        <Body>
          <View
            key={item.dealwithdesc}
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ textAlign: "center", fontSize: 12 }}>
                {item.dealwithdesc}
              </Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ textAlign: "center", fontSize: 12 }}>
                {item.amount}
              </Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ textAlign: "center", fontSize: 12 }}>
                {item.unit}
              </Text>
            </View>
          </View>
        </Body>
      </CardItem>
    );
  };
  const renderEditDefectContent = (values) => {
    if (selectedEditItem) {
      const fetect = selectedEditItem!;
      let asso: string[] = [];
      let units: string[] = [];
      if (fetect.standard && fetect.associate) {
        asso = fetect.associate.split(",")
        units = fetect.standard.split(",")
      }
      return (
        <View style={{ width: '100%' }}>
          {
            asso.length >= 1 && units.length >= 1 &&
            <Field
              name="length"
              validate={composeValidators(mustBeNumber)}
              warn={composeValidators(mustBeNumber)}
            >
              {
                field => (
                  <Item fixedLabel error={field.meta.error && field.meta.touched}>
                    <Label>{asso[0]}({units[0]})</Label>
                    <Input
                      keyboardType='numeric'
                      placeholder=""
                      {...field.input}
                    />
                    {field.meta.touched && field.meta.error && (
                      <Text>{field.meta.error}</Text>
                    )}
                  </Item>
                )
              }
            </Field>
          }
          {
            asso.length >= 2 && units.length >= 2 &&
            <Field
              name="width"
              validate={composeValidators(mustBeNumber)}
              warn={composeValidators(mustBeNumber)}
            >
              {
                field => (
                  <Item fixedLabel error={field.meta.error && field.meta.touched}>
                    <Label>{asso[1]}({units[1]})</Label>
                    <Input
                      keyboardType='numeric'
                      placeholder=""
                      {...field.input}
                    />
                    {field.meta.touched && field.meta.error && (
                      <Text>{field.meta.error}</Text>
                    )}
                  </Item>
                )
              }
            </Field>
          }
          {
            asso.length >= 3 && units.length >= 3 &&
            <Field
              name="depth"
              validate={composeValidators(mustBeNumber)}
              warn={composeValidators(mustBeNumber)}
            >
              {
                field => (
                  <Item fixedLabel error={field.meta.error && field.meta.touched}>
                    <Label>{asso[2]}({units[2]})</Label>
                    <Input
                      keyboardType='numeric'
                      placeholder=""
                      {...field.input}
                    />
                    {field.meta.touched && field.meta.error && (
                      <Text>{field.meta.error}</Text>
                    )}
                  </Item>
                )
              }
            </Field>
          }
          <Field
            name="amount"
            validate={composeValidators(mustBeNumber)}
            warn={composeValidators(mustBeNumber)}
          >
            {
              field => (
                <Item fixedLabel error={field.meta.error && field.meta.touched}>
                  <Label>工程量({fetect.unit})</Label>
                  <Input
                    placeholder=""
                    keyboardType='numeric'
                    {...field.input}
                  />
                  {field.meta.touched && field.meta.error && (
                    <Text>{field.meta.error}</Text>
                  )}
                </Item>
              )
            }
          </Field>
        </View>)
    }


  }

  return (
    <Form
      initialValues={{
        category: comProps.category, suboption: comProps.suboption,
        inspection: comProps.inspection, damage: comProps.damage,
        defect: comProps.defect, length: 0, width: 0, depth: 0, amount: 0

      }}
      onSubmit={() => { }}
      decorators={[focusOnError]}
      render={
        ({ handleSubmit, form, submitting, pristine, values }) => {

          return (
            <View>
              <View style={styles.view_container}>
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
                        <Field
                          name="category"
                          render={
                            props => (
                              <DynamicallySelectedPicker
                                ref={categoryEl}
                                items={category_data}
                                transparentItemRows={1}

                                onMomentumScrollEnd={({ index, item }) => {

                                  props.input.onChange(item.value)
                                  const cur_category = item.value;
                                  const cur_suboption = workloads.getDefaultSuboption(cur_category);
                                  const cur_inspection = workloads.getDefaultInspection(cur_category, cur_suboption)
                                  const cur_damage = workloads.getDefaultDamage(cur_category, cur_suboption, cur_inspection)

                                  comProps.setSelectedCategory(item.value);
                                  comProps.setSelectedSuboption(cur_suboption)
                                  comProps.setSelectedInspection(cur_inspection)
                                  comProps.setSelectedDamage(cur_damage)
                                  comProps.setSelectedDefect(workloads.getDefaultDefect(cur_category, cur_suboption, cur_inspection, cur_damage));
                                  // suboptionEl.current!.scrollToInitialPosition();
                                  // inspectionEl.current!.scrollToInitialPosition();
                                  // damageEl.current!.scrollToInitialPosition();
                                }}
                                height={130}
                                width={windowWidth}
                                fontSize={15}
                              />
                            )
                          }
                        >
                        </Field>
                      </View>
                      <View style={{ flex: 1, justifyContent: "center" }}>
                        <Field
                          name="suboption"
                          render={
                            props => {

                              return (
                                <DynamicallySelectedPicker
                                  ref={suboptionEl}
                                  items={suboption_data}

                                  transparentItemRows={1}
                                  onMomentumScrollEnd={({ index, item }) => {
                                    props.input.onChange(item.value)
                                    const cur_category = comProps.category;
                                    const cur_suboption = item.value;
                                    const cur_inspection = workloads.getDefaultInspection(cur_category, cur_suboption)
                                    const cur_damage = workloads.getDefaultDamage(cur_category, cur_suboption, cur_inspection)

                                    comProps.setSelectedSuboption(cur_suboption)
                                    comProps.setSelectedInspection(cur_inspection)
                                    comProps.setSelectedDamage(cur_damage)
                                    comProps.setSelectedDefect(workloads.getDefaultDefect(cur_category, cur_suboption, cur_inspection, cur_damage));
                                    // inspectionEl.current.scrollToInitialPosition();
                                    // damageEl.current.scrollToInitialPosition();
                                  }}
                                  height={130}
                                  width={windowWidth}
                                  fontSize={15}
                                />
                              )
                            }
                          }
                        >
                        </Field>
                      </View>
                      <View style={{ flex: 1, justifyContent: "center" }}>
                        <Field
                          name="inspection"
                          render={
                            props => {

                              return (
                                <DynamicallySelectedPicker
                                  ref={inspectionEl}
                                  items={inspection_data}
                                  transparentItemRows={1}
                                  onMomentumScrollEnd={({ index, item }) => {
                                    props.input.onChange(item.value)
                                    const cur_category = comProps.category;
                                    const cur_suboption = comProps.suboption;
                                    const cur_inspection = item.value;
                                    const cur_damage = workloads.getDefaultDamage(cur_category, cur_suboption, cur_inspection)

                                    comProps.setSelectedInspection(cur_inspection)
                                    comProps.setSelectedDamage(cur_damage)
                                    comProps.setSelectedDefect(workloads.getDefaultDefect(cur_category, cur_suboption, cur_inspection, cur_damage));
                                    // damageEl.current.scrollToInitialPosition();
                                  }}
                                  height={130}
                                  width={windowWidth}
                                  fontSize={15}
                                />
                              )
                            }

                          }
                        >
                        </Field>
                      </View>
                      <View style={{ flex: 1, justifyContent: "center" }}>
                        <Field
                          name="damage"
                          render={
                            props => {
                              return (
                                <DynamicallySelectedPicker
                                  ref={damageEl}
                                  items={damage_data}
                                  transparentItemRows={1}
                                  onMomentumScrollEnd={({ index, item }) => {
                                    props.input.onChange(item.value)
                                    comProps.setSelectedDamage(item.value);
                                    comProps.setSelectedDefect(workloads.getDefaultDefect(comProps.category, comProps.suboption, comProps.inspection, item.value));
                                  }}
                                  height={130}
                                  width={windowWidth}
                                  fontSize={15}
                                />
                              )
                            }
                          }
                        >
                        </Field>
                      </View>
                    </View>
                  </Body>
                </CardItem>
              </View>

              <View style={[styles.view_container, { marginBottom: 5 }]}>
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
                        <Text style={{ textAlign: "center" }}>维修方案</Text>
                      </View>
                      <View style={{ flex: 1, justifyContent: "center" }}>
                        <Text style={{ textAlign: "center" }}>工程量</Text>
                      </View>
                      <View style={{ flex: 1, justifyContent: "center" }}>
                        <Text style={{ textAlign: "center" }}>计量单位</Text>
                      </View>
                    </View>
                  </Body>
                </CardItem>
                <Field
                  name="defect"
                  render={
                    props => {
                      console.log('comProps.defect', comProps.defect);
                      return (
                        comProps.defect.map((item) => render_road_defect_item(form, item))
                      )
                    }
                  }
                >
                </Field>
                <Modal
                  style={{ zIndex: 9999 }}
                  isVisible={modalVisible}
                  coverScreen={false}
                  hasBackdrop={false}
                  onModalShow={
                    () => {
                      const item = selectedEditItem!;

                      form.change('length', item.length)
                      form.change('width', item.width)
                      form.change('depth', item.depth)
                      form.change('amount', item.amount)
                    }
                  }
                >
                  <View style={styles.content}>
                    {renderEditDefectContent(values)}
                    <View style={{ flexDirection: "row", marginTop: 15, marginBottom: 20, }}>
                      <View style={{ marginRight: 20 }}>
                        <Button bordered danger onPress={() => {
                          setModalVisible(!modalVisible)
                        }}  >
                          <Text>取消</Text>
                        </Button>
                      </View>
                      <View style={{ marginLeft: 20 }}>
                        <Button bordered success onPress={() => {
                          const idx = comProps.defect.findIndex(
                            item => item.dealwithdesc === selectedEditItem?.dealwithdesc && item.standard === selectedEditItem.standard
                          )
                          if (idx > -1) {
                            const found = comProps.defect[idx];
                            found.length = values.length;
                            found.width = values.width;
                            found.depth = values.depth;
                            found.amount = values.amount;
                            comProps.setSelectedDefect([...comProps.defect]);
                          }
                          setModalVisible(!modalVisible)
                        }}  >
                          <Text>确定</Text>
                        </Button>
                      </View>
                    </View>
                  </View>
                </Modal>                 
              </View>
            </View>
          )
        }
      }
    >
    </Form>
  )

}

const styles = StyleSheet.create({
  ...basic_styles,
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    margin: 0, // This is the important style you need to set  
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'grey',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  view: {
    justifyContent: 'flex-end',
    margin: 10,
    borderWidth: 1,
    borderColor: 'grey',
  },
});


