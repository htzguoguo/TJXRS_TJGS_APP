import { Button, Icon, Input, Item, Picker, Spinner, Text, View } from "native-base";
import React from "react";
import { Field, Form } from "react-final-form";
import createDecorator from 'final-form-focus'
import { composeValidators, isAlphaNumeric, isMaxLength15, isMinLength6, isMinLength8, isRequired } from '../../../components/validateRules';

import { StyleSheet } from "react-native";
interface IData {
  stationType: string;
  value: string;  
}

interface IProps {
  getData: (values: IData) => void
}
let focusOnError = createDecorator()
export const StationForm = (props: IProps) => (
  <Form
    initialValues={{ name: 'admin123', password: '123456' }}
    onSubmit={() => { }}
    decorators={[focusOnError]}
  >
    {({ handleSubmit, pristine, submitting }) => (
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
        <Text>K</Text>
        <Field
          name="kilometer"
          validate={composeValidators(isRequired, isAlphaNumeric, isMinLength6, isMaxLength15)}
          warn={composeValidators(isAlphaNumeric, isMinLength6, isMaxLength15)}
        >
          {
            field => (
              <Item error={field.meta.error && field.meta.touched}>                
                <Input                           
                  {...field.input}
                />
                {field.meta.touched && field.meta.error && (
                  <Text>{field.meta.error}</Text>
                )}
              </Item>
            )
          }
        </Field>
        <Text>+</Text>
        <Field
          name="meter"
          validate={composeValidators(isRequired, isAlphaNumeric, isMinLength6, isMaxLength15)}
          warn={composeValidators(isAlphaNumeric, isMinLength6, isMaxLength15)}
        >
          {
            field => (
              <Item error={field.meta.error && field.meta.touched}>                
                <Input                           
                  {...field.input}
                />
                {field.meta.touched && field.meta.error && (
                  <Text>{field.meta.error}</Text>
                )}
              </Item>
            )
          }
        </Field>
      </View>
    )}
  </Form>
)

const styles = StyleSheet.create({
  
  stationContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  }, 
});