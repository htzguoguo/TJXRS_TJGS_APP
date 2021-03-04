export * from "./StandardHeader"; import React, { Component } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";
import {
  View,
  Header,
  Form,
  Item,
  Button,
  Icon,
  Left,
  Body,
  Right,
  DatePicker,
  Text,
} from "native-base"; 
import { Picker } from '@react-native-picker/picker'; 
import { IProps } from "./types";

export function StandardHeader(props: IProps) {
  const navigation = useNavigation();
  const { isHome, title } = props;
  return (
    <Header>
      <Left>
        {isHome ? (
          <Button
            transparent
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Icon active name="menu" />
          </Button>
        ) : (
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="ios-arrow-back" />
            </Button>
          )}
      </Left>
      <Body>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Text>上报人:</Text>
          <Picker
            style={{ minWidth: 120 }}
            mode="dropdown"
            iosIcon={<Icon name="ios-arrow-down" />}
            placeholder="上报人"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff">
            <Item label="魏连惠" value="魏连惠" />
            <Item label="吕磊" value="吕磊" />
          </Picker>
        </View>
      </Body>
      <Right>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Text>日期:</Text>
          <DatePicker
            defaultDate={new Date()}
            locale={"zh-cn"}
            formatChosenDate={(date) => {
              return `${date.getFullYear()}年${date.getMonth() + 1
                }月${date.getDate()}日`;
            }}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            textStyle={{ color: "yellow" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
          />
        </View>
      </Right>
    </Header>
  );
}
