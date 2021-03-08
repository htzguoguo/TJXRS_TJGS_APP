import { Accordion, DatePicker, Icon, Item, Picker, Text, View } from "native-base"
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
  const dataArray = [
    { title: "First Element", content: " " },
  ];

  const render_highway_header = (handleSubmit, form, submitting, pristine, values, expanded: boolean) => {
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

  const render_highway_content = (handleSubmit, form, submitting, pristine, values) => {
    return (
      <View>
        <Field
          name="report"
          label="上报人"
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
          label="日期"
          render={
            props => (
              <Item picker>
                <DateTimePicker 
                  value={props.input.value} 
                  locale={"zh-cn"}
                  onChange={(value) => {
                    props.input.onChange(value)
                  }}
                  timeZoneOffsetInMinutes={undefined}
                />

              </Item>
            )
          }
        >
        </Field>
        <FormSpy
          subscription={{ values: true, valid: true }}
          onChange={(state) => {
            const { values, valid } = state
            // setHighwayIndex(Highway_Data.indexOf(values.name))
            // console.log(values);
            // setSelectedData({...values});
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
            expanded={[]}
            renderHeader={
              (item, expanded: boolean) =>
                render_highway_header(handleSubmit, form, submitting, pristine, values, expanded)
            }
            renderContent={
              () =>
                render_highway_content(handleSubmit, form, submitting, pristine, values)
            }
          />
        )
      }
    />

  )
}