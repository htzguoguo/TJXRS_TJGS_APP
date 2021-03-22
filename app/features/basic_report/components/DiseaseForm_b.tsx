import { Accordion, Body, Button, Card, CardItem, Container, Content, H2, H3, Header, Icon, Input, Item, Label, Left, Picker, Right, Spinner, Text, Title, View } from "native-base";
import React, { useRef, useState } from "react";
import { Field, Form, FormSpy } from "react-final-form";
import createDecorator from 'final-form-focus'
import Modal from 'react-native-modal';
import DynamicallySelectedPicker from "react-native-dynamically-selected-picker";
import { Dimensions, StyleSheet, TouchableHighlight } from "react-native";
import { useSelector } from "react-redux";
import { workloadSelector } from "../selectors";
import { IRoadDefect, IScrollPickerItem, IScrollPickerState } from "../types";
import { IWorkload } from "../../setting/models";
import { composeValidators, isRequired, mustBeNumber } from "../../../components/validateRules";


interface IProps {
  getData: (values: {}) => void
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
        const obj: IWorkload = item;
        return {
          dealwithdesc: obj.DealWithDesc ? obj.DealWithDesc : '',
          unit: obj.MonitoringUnit ? obj.MonitoringUnit : '',
          amount: 1,
          length: 1,
          width: 1,
          depth: 1,
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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEditItem, setSelectedEditItem] = useState<IRoadDefect | null>(null);
  const suboptionEl = useRef(null);
  const inspectionEl = useRef(null);
  const damageEl = useRef(null);
  const windowWidth = Dimensions.get("window").width / 4;
  const workloads = useSelector(workloadSelector);

  const [selectedCategory, setSelectedCategory] = useState<string>(getArrayFirstItemOrEmpty(workloads.category));

  const [selectedSuboption, setSelectedSuboption] = useState(getObjectFirstItemOrEmpty(workloads.parent_category, selectedCategory));

  const [selectedInspection, setSelectedInspection] = useState(getObjectFirstItemOrEmpty(workloads.subname, `${selectedCategory}-${selectedSuboption}`));

  const [selectedDamage, setSelectedDamage] = useState(getObjectFirstItemOrEmpty(workloads.viewresult, `${selectedCategory}-${selectedSuboption}-${selectedInspection}`));

  const [selectedDefect, setSelectedDefect] = useState(getDefectArrayOrEmpty(workloads.dealwith, `${selectedCategory}-${selectedSuboption}-${selectedInspection}-${selectedDamage}`));


  const category_data = getArrayOrEmpty(workloads.category);
  const suboption_data = getObjectArrayOrEmpty(workloads.parent_category, selectedCategory);
  const inspection_data = getObjectArrayOrEmpty(workloads.subname, `${selectedCategory}-${selectedSuboption}`);
  const damage_data = getObjectArrayOrEmpty(workloads.viewresult, `${selectedCategory}-${selectedSuboption}-${selectedInspection}`);

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
                    keyboardType = 'numeric'
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
                    keyboardType = 'numeric'
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
                    keyboardType = 'numeric'
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
                    keyboardType = 'numeric'                  
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
        category: selectedCategory, suboption: selectedSuboption,
        inspection: selectedInspection, damage: selectedDamage,
        defect: selectedDefect, length: 0, width: 0, depth: 0, amount: 0

      }}
      onSubmit={() => { }}
      decorators={[focusOnError]}
      render={
        ({ handleSubmit, form, submitting, pristine, values }) => {

          return (
            <View style={styles.record_item}>
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
                              items={category_data}
                              transparentItemRows={1}
                              initialSelectedIndex={0}
                              onScroll={({ index, item }) => {

                                props.input.onChange(item.value)
                                const cur_category = item.value;
                                const cur_suboption = getObjectFirstItemOrEmpty(workloads.parent_category, cur_category);
                                const cur_inspection = getObjectFirstItemOrEmpty(workloads.subname, `${cur_category}-${cur_suboption}`)
                                const cur_damage = getObjectFirstItemOrEmpty(workloads.viewresult, `${cur_category}-${cur_suboption}-${cur_inspection}`)

                                setSelectedCategory(item.value);
                                setSelectedSuboption(cur_suboption)
                                setSelectedInspection(cur_inspection)
                                setSelectedDamage(cur_damage)
                                setSelectedDefect(getDefectArrayOrEmpty(workloads.dealwith, `${cur_category}-${cur_suboption}-${cur_inspection}-${cur_damage}`));
                                suboptionEl.current.scrollToInitialPosition();
                                inspectionEl.current.scrollToInitialPosition();
                                damageEl.current.scrollToInitialPosition();
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
                                initialSelectedIndex={0}
                                transparentItemRows={1}
                                onScroll={({ index, item }) => {
                                  props.input.onChange(item.value)
                                  const cur_category = selectedCategory;
                                  const cur_suboption = item.value;
                                  const cur_inspection = getObjectFirstItemOrEmpty(workloads.subname, `${cur_category}-${cur_suboption}`)
                                  const cur_damage = getObjectFirstItemOrEmpty(workloads.viewresult, `${cur_category}-${cur_suboption}-${cur_inspection}`)

                                  setSelectedSuboption(cur_suboption)
                                  setSelectedInspection(cur_inspection)
                                  setSelectedDamage(cur_damage)
                                  setSelectedDefect(getDefectArrayOrEmpty(workloads.dealwith, `${cur_category}-${cur_suboption}-${cur_inspection}-${cur_damage}`));
                                  inspectionEl.current.scrollToInitialPosition();
                                  damageEl.current.scrollToInitialPosition();
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
                                initialSelectedIndex={0}
                                transparentItemRows={1}
                                onScroll={({ index, item }) => {
                                  props.input.onChange(item.value)
                                  const cur_category = selectedCategory;
                                  const cur_suboption = selectedSuboption;
                                  const cur_inspection = item.value;
                                  const cur_damage = getObjectFirstItemOrEmpty(workloads.viewresult, `${cur_category}-${cur_suboption}-${cur_inspection}`)

                                  setSelectedInspection(cur_inspection)
                                  setSelectedDamage(cur_damage)
                                  setSelectedDefect(getDefectArrayOrEmpty(workloads.dealwith, `${cur_category}-${cur_suboption}-${cur_inspection}-${cur_damage}`));
                                  damageEl.current.scrollToInitialPosition();
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
                                initialSelectedIndex={0}
                                transparentItemRows={1}
                                onScroll={({ index, item }) => {
                                  props.input.onChange(item.value)
                                  setSelectedDamage(item.value);
                                  setSelectedDefect(getDefectArrayOrEmpty(workloads.dealwith, `${selectedCategory}-${selectedSuboption}-${selectedInspection}-${item.value}`));
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
                    return (
                      selectedDefect.map((item) => render_road_defect_item(form, item))
                    )
                  }
                }
              >
              </Field>
              <Modal
                isVisible={modalVisible}
                coverScreen={false}
                hasBackdrop={false}
                onModalShow={
                  () => {
                    const item = selectedEditItem!;
                    console.log('Modal onModalShow', item);
                    form.change('length', item.length)
                    form.change('width', item.width)
                    form.change('depth', item.depth)
                    form.change('amount', item.amount)
                  }
                }
              >
                <View style={styles.content}>
                  {renderEditDefectContent(values)}
                  <View style={{ flexDirection: "row", marginTop: 15 }}>
                    <View style={{ marginRight: 20 }}>
                      <Button bordered danger onPress={() => {
                        setModalVisible(!modalVisible)
                      }}  >
                        <Text>取消</Text>
                      </Button>
                    </View>
                    <View style={{ marginLeft: 20 }}>
                      <Button bordered success onPress={() => {
                        const idx = selectedDefect.findIndex(
                          item => item.dealwithdesc === selectedEditItem?.dealwithdesc && item.standard === selectedEditItem.standard
                        )
                        if (idx > -1) {
                          const found = selectedDefect[idx];
                          found.length = values.length;
                          found.width = values.width;
                          found.depth = values.depth;
                          found.amount = values.amount;
                          setSelectedDefect([...selectedDefect]);
                        }
                        setModalVisible(!modalVisible)
                      }}  >
                        <Text>确定</Text>
                      </Button>
                    </View>
                  </View>
                </View>
              </Modal>
              <FormSpy
                subscription={{ values: true, valid: true }}
                onChange={(state) => {
                  const { values, valid } = state
                  // setHighwayIndex(Highway_Data.indexOf(values.name))

                  // setSelectedData({...values});
                  props.getData(values)
                }} />
            </View>
          )
        }
      }
    >
    </Form>
  )

}

const styles = StyleSheet.create({
  record_item: {
    marginTop: 5,
    marginBottom: 5,    
    flex: 0,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 0,
    marginVertical: 1,
    borderRadius: 1,
    marginHorizontal: 1,
    padding: 0,
    borderWidth: 0,
  },
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


