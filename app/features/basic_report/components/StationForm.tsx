import { Accordion, Button, H2, H3, Icon, Input, Item, Picker, Spinner, Text, View } from "native-base";
import React from "react";
import { Field, Form, FormSpy } from "react-final-form";
import createDecorator from 'final-form-focus'
import { composeValidators, isAlphaNumeric, isMaxLength, isMinLength, mustBeNumber, isRequired } from '../../../components/validateRules';

import { StyleSheet } from "react-native";
interface IData {
  stationType: string;
  value: string;
}

interface IProps {
  getData: (values: IData) => void
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

  const render_content = (handleSubmit, form, submitting, pristine, values) => {
    return (
      <View padder style={styles.stationContainer}>
        <Field
          name="stationType"
          validate={isRequired}
          warn={isRequired}
        >
          {
            field => (


              <Item picker>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="ios-arrow-down" />}
                  style={{ width: "90%" }}
                  placeholder="请选择"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff">
                  <Picker.Item label="道路桩号" value="道路桩号" />
                </Picker>
              </Item>
            )
          }
        </Field>
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
                    keyboardType = 'numeric'
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
                    keyboardType = 'numeric'
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
          >
           
          </Accordion>
        )
      }
    >
    </Form>
  )

}

const styles = StyleSheet.create({

  stationContainer: {
    flex: 1,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
});