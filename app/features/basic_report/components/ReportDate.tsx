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
  const [date, setDate] = useState(InitialValue.date);
  const [name, setName] = useState(InitialValue.report);
  const [show, setShow] = useState(false);
  const dataArray = [
    { title: "First Element", content: " " },
  ];
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false)
    setDate(currentDate);
  };

  const render_highway_header = (item, expanded) => {
    return (
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Text style={{ fontWeight: "600" }}>
          {`${date.getFullYear()}年${date.getMonth() + 1
            }月${date.getDate()}日-${name}`}
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

  const render_highway_content = () => {
    return (
      <View>
        <Item picker>
          <Picker
            mode="dropdown"
            selectedValue={name}
            onValueChange={
              (value, position) => {
                setName(value)
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
        <Item>
          <Button transparent={true} onPress={() => setShow(true)}  >
            <Text>{`${date.getFullYear()}年${date.getMonth() + 1
              }月${date.getDate()}日`}</Text>
          </Button>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode='date'
              is24Hour={true}
              display="default"
              onChange={onDateChange}
            />
          )}

        </Item>

      </View>
    )

  };

  return (
    <Accordion
     style={{marginBottom: 5}}
      dataArray={dataArray}
      expanded={[]}
      renderHeader={
        render_highway_header
      }
      renderContent={

        render_highway_content
      }
    />

  )
}