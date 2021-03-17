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
  Title,
} from "native-base"; 
import { Picker } from '@react-native-picker/picker'; 
import { IProps } from "./types";
import { isString } from "lodash";

export function StandardHeader(props: IProps) {
  const navigation = useNavigation();
  const { isHome, body, right } = props;
  return (
    <Header>
      <Left style={{ flex: 1,  justifyContent: 'flex-start'  }}>
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
      <Body style={{ flex: 1,  justifyContent: 'center', alignItems: 'center' }}>
       
          {
            body && (
              isString(body) ? <Title>{body}</Title> :
              <body/>
            ) 
          }
      
      </Body>
      <Right style={{ flex: 1,  justifyContent: 'flex-end'  }}>
        
          {
            right && (
              isString(right) ? <Title>{right}</Title> :
               right()
            ) 
          }
       
      </Right>
    </Header>
  );
}
