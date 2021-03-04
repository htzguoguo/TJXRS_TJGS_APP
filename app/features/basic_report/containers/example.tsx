import React, { useState } from "react";
import {

  Dimensions,
  SafeAreaView,
  ScrollView,
  View,

} from "react-native";
import DynamicallySelectedPicker from "react-native-dynamically-selected-picker";
import {

  Body,
  Card,
  CardItem,
  Container,
  Content,
  Text,

} from "native-base";
import { mock_road_defects } from "../mock_data";
import { IRoadDefect } from "../types";



export default function Example() {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  const windowWidth = Dimensions.get('window').width;
  const render_road_defect_item = (item: IRoadDefect) => {
    return (
      <CardItem bordered>
        <Body>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ textAlign: "center", fontSize: 8 }}>
                {item.position}
              </Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ textAlign: "center", fontSize: 8 }}>
                {item.name}
              </Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ textAlign: "center", fontSize: 8 }}>
                {item.desc}
              </Text>
            </View>
          </View>
        </Body>
      </CardItem>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Content padder>
          <Card  >
            <CardItem header bordered>
              <Text>病害信息</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ textAlign: "center" }}>类别</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ textAlign: "center" }}>分项名称</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ textAlign: "center" }}>巡查项目</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ textAlign: "center" }}>损坏情况</Text>
                  </View>
                </View>
              </Body>
            </CardItem>
            <CardItem bordered>
              <Body>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <ScrollView  nestedScrollEnabled={true}  >
                    <DynamicallySelectedPicker
                      items={[
                        {
                          value: 1,
                          label: 'Item 1',
                        },
                        {
                          value: 2,
                          label: 'Item 2',
                        },
                        {
                          value: 3,
                          label: 'Item 3',
                        },
                        {
                          value: 4,
                          label: 'Item 4',
                        },
                        {
                          value: 5,
                          label: 'Item 5',
                        },
                      ]}
                      onScroll={({ index, item }) => {
                        setSelectedItemIndex(index);
                      }}
                      height={300}
                      width={windowWidth}
                    />

                  </ScrollView >
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text>Selected item index {selectedItemIndex}</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: "center" }}>

                  </View>
                  <View style={{ flex: 1, justifyContent: "center" }}>

                  </View>
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card  >
            <CardItem header bordered>
              <Text>预估工程量</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ textAlign: "center" }}>病害位置</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ textAlign: "center" }}>分项名称</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ textAlign: "center" }}>病害描述</Text>
                  </View>
                </View>
              </Body>
            </CardItem>
            {mock_road_defects.map((item) => render_road_defect_item(item))}
          </Card>
          <Card  >
            <CardItem header bordered>
              <Text>预估工程量</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ textAlign: "center" }}>病害位置</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ textAlign: "center" }}>分项名称</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ textAlign: "center" }}>病害描述</Text>
                  </View>
                </View>
              </Body>
            </CardItem>
            {mock_road_defects.map((item) => render_road_defect_item(item))}
          </Card>
        </Content>
      </Container>
    </SafeAreaView>
  );
}