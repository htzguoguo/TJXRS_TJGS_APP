import {
  Accordion,
  Button,
  DatePicker,
  Icon,
  Item,
  Picker,
  Text,
  View,
} from 'native-base';
import React, { useState } from 'react';
import { Field, Form, FormSpy, useField, useForm } from 'react-final-form';
import DateTimePicker from '@react-native-community/datetimepicker';

import { report_data } from './reports_data';
import { StyleSheet } from 'react-native';
import basic_styles from '../styles';
import { padNumber } from '../../../utils/stringUtils';
interface IReporterSelectorData {
  report: string;
  date: Date;
  weather: string;
}

interface IProps {
  getData: (values) => void;
  Weather_Data: string[];
  initial_data: IReporterSelectorData;
  report_data: string[];
}

export const ReporterSelector = (comProps: IProps) => {
  const [show, setShow] = useState(false);
  const dataArray = [{ title: 'First Element', content: ' ' }];

  const render_header = (
    handleSubmit,
    form,
    submitting,
    pristine,
    values,
    expanded: boolean,
  ) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{ fontWeight: '600' }}>
          {`${values.date.getFullYear()}年${values.date.getMonth() + 1
            }月${values.date.getDate()}日-${values.report}`}
        </Text>
        {expanded ? (
          <Icon
            active
            name="arrow-undo-circle-outline"
            style={{ color: 'green', fontSize: 32 }}
          />
        ) : (
          <Icon
            name="arrow-forward-circle-outline"
            style={{ color: '#27a', fontSize: 32 }}
          />
        )}
      </View>
    );
  };

  const render_content = (handleSubmit, form, submitting, pristine, values) => {
    return (
      <View style={styles.view_container}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Field
              name="date"
              render={(props) => (
                <Item>
                  <Button transparent={true} onPress={() => setShow(true)}>
                    {
                      <Text>{`${values.date.getFullYear()}${padNumber(
                        values.date.getMonth() + 1,
                      )}${padNumber(values.date.getDate())}`}</Text>
                    }
                  </Button>
                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={props.input.value}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={(value, position) => {
                        setShow(false);
                        position && props.input.onChange(position);
                      }}
                    />
                  )}
                </Item>
              )}></Field>
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Field
              name="weather"
              render={(props) => (
                <Item picker>
                  <Picker
                    mode="dropdown"
                    selectedValue={props.input.value}
                    onValueChange={(value, position) => {
                      props.input.onChange(value);
                    }}
                    iosIcon={<Icon name="ios-arrow-down" />}
                    style={{ width: '90%' }}
                    placeholder="选择天气"
                    placeholderStyle={{ color: '#bfc6ea' }}
                    placeholderIconColor="#007aff">
                    {comProps.Weather_Data.map((item, index) => {
                      return (
                        <Picker.Item key={index} label={item} value={item} />
                      );
                    })}
                  </Picker>
                </Item>
              )}></Field>
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Field
              name="report"
              render={(props) => (
                <Item picker>
                  <Picker
                    mode="dropdown"
                    selectedValue={props.input.value}
                    onValueChange={(value, position) => {
                      props.input.onChange(value);
                    }}
                    iosIcon={<Icon name="ios-arrow-down" />}
                    style={{ width: '90%' }}
                    placeholder="选择"
                    placeholderStyle={{ color: '#bfc6ea' }}
                    placeholderIconColor="#007aff">
                    {comProps.report_data.map((item, index) => {
                      return (
                        <Picker.Item key={index} label={item} value={item} />
                      );
                    })}
                  </Picker>
                </Item>
              )}></Field>
          </View>

        </View>
        <FormSpy
          subscription={{ values: true, valid: true }}
          onChange={(state) => {
            const { values, valid } = state;
            comProps.getData(values);
          }}
        />
      </View>
    );
  };

  return (
    <Form
      initialValues={comProps.initial_data}
      onSubmit={() => { }}
      render={({ handleSubmit, form, submitting, pristine, values }) =>
        render_content(handleSubmit, form, submitting, pristine, values)
      }
    />
  );
};

const styles = StyleSheet.create({
  ...basic_styles,
});
