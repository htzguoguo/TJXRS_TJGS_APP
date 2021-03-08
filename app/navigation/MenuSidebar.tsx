import styles from "./styles";
import React, { Component } from "react";
import { Image } from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge
} from "native-base";

import imageConfig from "../config/images-config";
import { navigationService } from "./NavigationService";
import { useDispatch } from "react-redux";
import * as loginActions from '../features/login/actions';
import { IMenuDataItem } from "./types";
const datas: IMenuDataItem[]  = [
  {
    name: "视频监控",
    route: "BlankPage",
    icon: "videocam",
    bg: "#C5F442"
  },
  {
    name: "巡查上报",
    route: "BasicReport",
    icon: "share",
    icon_color: "#387ef5",
    bg: "#477EEA",
    types: "11"
  },
  {
    name: "维修反馈",
    route: "BlankPage",
    icon: "arrow-down",
    bg: "#DA4437",
    types: "4"
  },
  {
    name: "验收反馈",
    route: "BlankPage",
    icon: "repeat",
    bg: "#C5F442",
    types: "5"
  },
  {
    name: "应急派单",
    route: "BlankPage",
    icon: "easel",
    bg: "#C5F442"
  },
  {
    name: "设置",
    route: "Setting",
    icon: "settings",
    icon_color: "#555",
    bg: "#4DCAE0"
  }, 
  {
    name: "退出",
    route: "logout",
    icon: "flag",
    bg: "#4DCAE0"
  }, 
];

export function MenuSidebar(props) {
  const dispatch = useDispatch();
  const onLogout = () => dispatch(loginActions.logOut());
  return (
    <Container>
      <Content
        bounces={false}
        style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
      >
        <Image source={imageConfig.menu.cover} style={styles.drawerCover} />
        {/* <Image   style={styles.drawerImage} source={imageConfig.menu.logo} /> */}

        <List
          dataArray={datas}
          renderRow={(data: IMenuDataItem) =>
            <ListItem
              button
              noBorder
              onPress={
                data.route === 'logout' ?
                () => onLogout() :
                () => navigationService.navigate(data.route)
              }
            >
              <Left>
                <Icon
                  active
                  name={data.icon}
                  style={{ color: data.icon_color ? data.icon_color : "#777", fontSize: 26, width: 30 }}
                />
                <Text style={styles.text}>
                  {data.name}
                </Text>
              </Left>
              {data.types &&
                <Right style={{ flex: 1 }}>
                  <Badge
                    style={{
                      borderRadius: 3,
                      height: 25,
                      width: 72,
                      backgroundColor: data.bg
                    }}
                  >
                    <Text
                      style={styles.badgeText}
                    >{`${data.types} Types`}</Text>
                  </Badge>
                </Right>}
            </ListItem>}
        />
      </Content>
    </Container>
  );
}
