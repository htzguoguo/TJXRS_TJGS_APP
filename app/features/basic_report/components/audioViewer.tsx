import { CardItem, Icon, Left, Right, Text, View } from "native-base"

import React from "react"
import { StyleSheet } from "react-native";

import basic_styles from '../styles';

export const AudioViewer = () => {

  return (
    <View style={styles.view_container}>
      <CardItem header bordered>
        <Text>最近录音</Text>
      </CardItem>
      <CardItem bordered>
        <Left>
          <Icon active name="radio" style={{ color: "#DD5044" }} />
          <Text>我的录音</Text>
        </Left>
        <Right>
          <Text>00:13:44</Text>
        </Right>
      </CardItem>
      <CardItem bordered>
        <Left>
          <Icon active name="radio" style={{ color: "#3B579D" }} />
          <Text>我的录音</Text>
        </Left>
        <Right>
          <Text>00:13:44</Text>
        </Right>
      </CardItem>
    </View>
  )
}

const styles = StyleSheet.create({
  ...basic_styles,
});


