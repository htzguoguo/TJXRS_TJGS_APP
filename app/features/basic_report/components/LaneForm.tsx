import { Button, FooterTab, Icon, Picker, Text, View } from "native-base"
import React from "react"
import { StyleSheet } from "react-native";
import basic_styles from '../styles';
interface IProps {
  setData: (value: string) => void;  
  initial_data: string;
  Lands_Data: string[];  
}

export const LaneForm = (comProps: IProps) => {
  return (
    <View style={[styles.view_container]}>
      <Picker
        mode="dropdown"
        selectedValue={comProps.initial_data}
        onValueChange={
          (value, position) => {
            comProps.setData(value)
          }

        }
        iosIcon={<Icon name="ios-arrow-down" />}
        style={{ width: "90%" }}
        placeholder="车道"
        placeholderStyle={{ color: "#bfc6ea" }}
        placeholderIconColor="#007aff">
        {
          comProps.Lands_Data.map(
            (item, index) => {
              return <Picker.Item key={index} label={item} value={item} />
            }
          )
        }
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  ...basic_styles,

});



