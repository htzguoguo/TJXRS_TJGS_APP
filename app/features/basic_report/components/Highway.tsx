import { Accordion, Icon, Item, Picker, Text, View } from "native-base"
import React, { useState } from "react"
import { Field, Form, FormSpy, useField, useForm } from "react-final-form";
import WhenFieldChanges from "../../../components/WhenFieldChanges";


import { Direction_Data, Highway_Data, Lands_Data, Weather_Data } from "./highway_data";

interface IData {
  weather: string;
  name: string;
  direction: string;
  lane: string;
}

interface IProps {
  getData: (values) => void
}

const InitialValue: IData = { weather: Weather_Data[0], name: Highway_Data[0], direction: Direction_Data[0][0], lane: Lands_Data[0] }

export const HighwaySelector = (props: IProps) => {
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
          {`${values.weather}，${values.name.substring(0, 6)},${values.direction},${values.lane}`}
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

  const render_direction = (values) => {

    const result = Direction_Data[Highway_Data.indexOf(values.name)];
    // values.direction = result[0];
    // console.log('render_direction', values);
    return result.map(
      (item, index) => {
        return <Picker.Item key={index} label={item} value={item} />
      }
    )
  }

  const render_highway_content = (handleSubmit, form, submitting, pristine, values) => {
    return (
      <View>
        <Field
          name="weather"
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
                  placeholder="选择天气"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff">
                  {
                    Weather_Data.map(
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
          name="name"
          render={
            props => (
              <Item picker>
                <Picker
                  mode="dropdown"
                  selectedValue={props.input.value}
                  onValueChange={
                    (value, position) => {
                      props.input.onChange(value)
                      form.change('direction', Direction_Data[Highway_Data.indexOf(value)][0]);
                      // directionField.input.onChange(Direction_Data[Highway_Data.indexOf(value)][0]);                           
                    }

                  }
                  iosIcon={<Icon name="ios-arrow-down" />}
                  style={{ width: "90%" }}
                  placeholder="高速名称"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff">
                  {
                    Highway_Data.map(
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
          name="direction"
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
                  placeholder="行车方向"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff">
                  {
                    render_direction(values)
                    // Direction_Data[selectedHighwayIndex].map(
                    //   (item, index) => {
                    //     return <Picker.Item key={index} label={item} value={item} />
                    //   }
                    // )

                  }
                </Picker>
              </Item>
            )
          }
        >


        </Field>
        <Field
          name="lane"
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
                  placeholder="车道"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff">
                  {
                    Lands_Data.map(
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
        {/* <WhenFieldChanges
                  field='name'
                  set='direction'
                  to={-1}
                /> */}
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
          style={{marginBottom: 5}}
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