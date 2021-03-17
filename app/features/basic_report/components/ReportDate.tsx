import { Accordion, Button, DatePicker, Icon, Item, Picker, Text, View } from "native-base"
import React, { useState } from "react"
import { Field, Form, FormSpy, useField, useForm } from "react-final-form";
import DateTimePicker from '@react-native-community/datetimepicker';

import { report_data } from "./reports_data";

interface IData {
  report: string;
  date: Date;
}

interface IProps {
  getData: (values) => void
}

const InitialValue: IData = { report: report_data[0], date: new Date() }

export const ReporterSelector = (props: IProps) => {  
  const [show, setShow] = useState(false);
  const dataArray = [
    { title: "First Element", content: " " },
  ];

  const render_header = (handleSubmit, form, submitting, pristine, values, expanded: boolean) => {
    return (
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Text style={{ fontWeight: "600" }}>
          {`${values.date.getFullYear()}年${values.date.getMonth() + 1
            }月${values.date.getDate()}日-${values.report}`}
        </Text>
        {expanded ? (
          <Icon
            active
            name="arrow-undo-circle-outline"
            style={{ color: "green", fontSize: 32 }}
          />
        ) : (
            <Icon
              name="arrow-forward-circle-outline"
              style={{ color: "#27a", fontSize: 32 }}
            />
          )}
      </View>
    );
  };

  const render_content = (handleSubmit, form, submitting, pristine, values) => {
    return (
      <View>
        <Field
          name="report"
          render={
            props => (
              <Item picker>
                <Picker
                  mode="dropdown"
                  selectedValue={props.input.value}
                  onValueChange={
                    (value, position) => {
                      props.input.onChange(value)
                    }
                  }
                  iosIcon={<Icon name="ios-arrow-down" />}
                  style={{ width: "90%" }}
                  placeholder="选择"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff">
                  {
                    report_data.map(
                      (item, index) => {
                        return <Picker.Item key={index} label={item} value={item} />
                      }
                    )
                  }
                </Picker>
              </Item>
            )
          }
        >
        </Field>

        <Field
          name="date"
          render={
            props => (
              <Item>               
                <Button transparent={true} onPress={() => setShow(true)}  >
                  <Text>{`${values.date.getFullYear()}年${values.date.getMonth() + 1
                    }月${values.date.getDate()}日`}</Text>
                </Button>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={props.input.value}
                    mode='date'
                    is24Hour={true}
                    display="default"
                    onChange={
                      (value, position) => {
                        setShow(false)
                        props.input.onChange(position)
                      }
                    }
                  />
                )}
              </Item>
            )
          }
        >
        </Field>
        <FormSpy
          subscription={{ values: true, valid: true }}
          onChange={(state) => {
            const { values, valid } = state             
            props.getData(values)
          }} />
      </View>
    )

  };

  return (
    <Form
      initialValues={InitialValue}
      onSubmit={() => { }}
      render={
        ({ handleSubmit, form, submitting, pristine, values }) => (
          <Accordion
            
            dataArray={dataArray}
            expanded={[0]}
            renderHeader={
              (item, expanded: boolean) =>
                render_header(handleSubmit, form, submitting, pristine, values, expanded)
            }
            renderContent={
              () =>
                render_content(handleSubmit, form, submitting, pristine, values)
            }
          />
        )
      }
    />
  )
}