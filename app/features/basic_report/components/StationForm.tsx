import { Accordion, Button, H2, H3, Icon, Input, Item, Picker, Spinner, Text, View } from "native-base";
import React from "react";
import { Field, Form, FormSpy } from "react-final-form";
import createDecorator from 'final-form-focus'
import { composeValidators, isAlphaNumeric, isMaxLength, isMinLength, mustBeNumber, isRequired } from '../../../components/validateRules';

import { StyleSheet } from "react-native";
import basic_styles from '../styles';
export interface IStationSelectorData {
  stationType: string;
  kilometer: string;
  meter: string;
  endkilometer: string;
  endmeter: string;
}

interface IProps {
  getData: (values: IStationSelectorData) => void;
  initial_data: IStationSelectorData;
}
const dataArray = [
  { title: "First Element", content: " " },
];
let focusOnError = createDecorator()
export const StationForm = (props: IProps) => {

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
          {`${values.stationType}:K${values.kilometer}+${values.meter}`}
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

  const render_number_input = (fieldName: string) => {
    return (
      <Field
      name={fieldName}
      validate={composeValidators(isRequired, mustBeNumber, isMinLength(1), isMaxLength(3))}
      warn={composeValidators(mustBeNumber, isMinLength(1), isMaxLength(3))}
    >
      {
        field => (
          <View style={{ flex: 2 }}>
            <Item error={field.meta.error && field.meta.touched}>
              <Input
                keyboardType='numeric'
                {...field.input}
              />
              {field.meta.touched && field.meta.error && (
                <Text>{field.meta.error}</Text>
              )}
            </Item>
          </View>
        )
      }
    </Field>
    )
  }

  const render_range_form = () => {
    return (
      <View>
       <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Text>K</Text>
        {render_number_input('kilometer')}      
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <H2>+</H2>
        </View>
        {render_number_input('meter')} 
      </View>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Text>至</Text>
        {render_number_input('endkilometer')}      
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <H2>+</H2>
        </View>
        {render_number_input('endmeter')} 
      </View>  
      </View>
      
    );
  }

  const render_station_form = () => {
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Text>K</Text>
        <Field
          name="kilometer"
          validate={composeValidators(isRequired, mustBeNumber, isMinLength(1), isMaxLength(3))}
          warn={composeValidators(mustBeNumber, isMinLength(1), isMaxLength(3))}
        >
          {
            field => (
              <View style={{ flex: 2 }}>
                <Item error={field.meta.error && field.meta.touched}>
                  <Input
                    keyboardType='numeric'
                    {...field.input}
                  />
                  {field.meta.touched && field.meta.error && (
                    <Text>{field.meta.error}</Text>
                  )}
                </Item>
              </View>
            )
          }
        </Field>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <H2>+</H2>
        </View>
        <Field
          name="meter"
          validate={composeValidators(isRequired, mustBeNumber, isMinLength(1), isMaxLength(3))}
          warn={composeValidators(mustBeNumber, isMinLength(1), isMaxLength(3))}
        >
          {
            field => (
              <View style={{ flex: 2 }}>
                <Item error={field.meta.error && field.meta.touched}>
                  <Input
                    keyboardType='numeric'
                    {...field.input}
                  />
                  {field.meta.touched && field.meta.error && (
                    <Text>{field.meta.error}</Text>
                  )}
                </Item>
              </View>
            )
          }
        </Field>
      </View>
    );
  }

  const render_content_form = (handleSubmit, form, submitting, pristine, values) => {
    const stationType: string = values.stationType;
    if (stationType === '道路桩号' || stationType === '联络线') {
      return render_station_form()
    } else if(stationType === '区间') {
      return render_range_form()
    }
  }

  const render_content = (handleSubmit, form, submitting, pristine, values) => {

    return (
      <View padder style={styles.stationContainer}>
        <Field
          name="stationType"
          validate={isRequired}
          warn={isRequired}
        >
          {
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
                  placeholder="请选择"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff">
                  <Picker.Item label="道路桩号" value="道路桩号" />
                  <Picker.Item label="区间" value="区间" />
                  <Picker.Item label="桥梁匝道" value="桥梁匝道" />
                  <Picker.Item label="联络线" value="联络线" />
                  <Picker.Item label="站区" value="站区" />
                  <Picker.Item label="其它" value="其它" />
                </Picker>
              </Item>
            )
          }
        </Field>
        {render_content_form(handleSubmit, form, submitting, pristine, values)}
        {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

          <Text>K</Text>
          <Field
            name="kilometer"
            validate={composeValidators(isRequired, mustBeNumber, isMinLength(1), isMaxLength(3))}
            warn={composeValidators(mustBeNumber, isMinLength(1), isMaxLength(3))}
          >
            {
              field => (
                <View style={{ flex: 2 }}>


                  <Item error={field.meta.error && field.meta.touched}>
                    <Input
                      keyboardType='numeric'
                      {...field.input}
                    />
                    {field.meta.touched && field.meta.error && (
                      <Text>{field.meta.error}</Text>
                    )}
                  </Item>
                </View>
              )
            }
          </Field>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <H2>+</H2>
          </View>
          <Field
            name="meter"
            validate={composeValidators(isRequired, mustBeNumber, isMinLength(1), isMaxLength(3))}
            warn={composeValidators(mustBeNumber, isMinLength(1), isMaxLength(3))}
          >
            {
              field => (
                <View style={{ flex: 2 }}>
                  <Item error={field.meta.error && field.meta.touched}>
                    <Input
                      keyboardType='numeric'
                      {...field.input}
                    />
                    {field.meta.touched && field.meta.error && (
                      <Text>{field.meta.error}</Text>
                    )}
                  </Item>
                </View>
              )
            }
          </Field>
        </View> */}
        <FormSpy
          subscription={{ values: true, valid: true }}
          onChange={(state) => {
            const { values, valid } = state
            props.getData(values)
          }} />
      </View>
    )
  }

  return (
    <Form
      initialValues={{ stationType: '道路桩号', kilometer: '0', meter: '0' }}
      onSubmit={() => { }}
      decorators={[focusOnError]}
      render={
        ({ handleSubmit, form, submitting, pristine, values }) => (
          <Accordion
            style={styles.view_container}
            dataArray={dataArray}
            expanded={[]}
            renderHeader={
              (item, expanded: boolean) =>
                render_header(handleSubmit, form, submitting, pristine, values, expanded)
            }
            renderContent={
              () =>
                render_content(handleSubmit, form, submitting, pristine, values)
            }
          >
          </Accordion>
        )
      }
    >
    </Form>
  )

}

const styles = StyleSheet.create({
  ...basic_styles,
  stationContainer: {
    flex: 1,
  },
});