import React, { useCallback, useState } from "react";
import {
  SafeAreaView,
  Dimensions,
  View,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import DynamicallySelectedPicker from "react-native-dynamically-selected-picker";
import {
  Container,
  Content,
  Form,
  Item,
  Grid,
  Row,
  Accordion,
  Text,
  Icon,
  Footer,
  FooterTab,
  Button,
  Col,
  Card,
  CardItem,
  Left,
  Right,
  Body,
} from "native-base";
import { Form as FinalForm } from "react-final-form";
import { Picker } from '@react-native-picker/picker';
import styles from "./styles";
import {
  IProps,
  IReportBasicInfo,
  IScrollPickerState,
  IRoadDefect,
} from "../types";
import { StandardHeader } from "../../../components/Header";
import imagesConfig from "../../../config/images-config";
import {
  mock_reports,
  mock_category,
  mock_sub_option,
  mock_Inspection,
  mock_Damage,
  mock_road_defects,
} from "../mock_data";
import { HighwaySelector } from "../components/Highway";
import { ReporterSelector } from "../components/ReportDate";
import { StationForm } from "../components/StationForm";
function BasicReport(props: IProps) {
  const windowWidth = Dimensions.get("window").width / 4;

  const [selectedCategory, setSelectedCategory] = useState<IScrollPickerState>({
    index: 0,
    item: mock_category[0],
  });
  const [selectedSuboption, setSelectedSuboption] = useState<
    number
  >(0);
  const [selectedInspection, setSelectedInspection] = useState<
    IScrollPickerState
  >({
    index: 0,
    item: mock_Inspection[0],
  });
  const [selectedDamage, setSelectedDamage] = useState<IScrollPickerState>({
    index: 0,
    item: mock_Damage[0],
  });

  const getHighwayData = useCallback((item) => {
    console.log('You clicked ', item);
  }, []);

  const getStationData = useCallback((item) => {
    console.log('You clicked ', item);
  }, []);



  const render_basic_info_item = (item: IReportBasicInfo) => {
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
                {item.caseid}
              </Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ textAlign: "center", fontSize: 8 }}>
                {item.lane}
              </Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ textAlign: "center", fontSize: 8 }}>
                {item.subject}
              </Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ textAlign: "center", fontSize: 8 }}>
                {item.category}
              </Text>
            </View>
          </View>
        </Body>
      </CardItem>
    );
  };

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
  const dataArray = [
    { title: "First Element", content: " " },
  ];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <StandardHeader isHome={true} body="巡查上报" />
        <Content  >
          {
            ReporterSelector({ getData: getHighwayData })
          }
          {
            HighwaySelector({ getData: getHighwayData })
          }
          {
            StationForm({ getData: getHighwayData })
          }
          
          <Card style={styles.record_item}>
            <CardItem header bordered>
              <Text>现场照片</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Grid>
                  <Col style={styles.col}>
                    <Image
                      source={imagesConfig.maintain.m1}
                      style={styles.maintain_image}></Image>
                  </Col>
                  <Col style={styles.col}>
                    <Image
                      source={imagesConfig.maintain.m2}
                      style={styles.maintain_image}></Image>
                  </Col>
                  <Col style={styles.col}>
                    <Image
                      source={imagesConfig.maintain.m3}
                      style={styles.maintain_image}></Image>
                  </Col>
                </Grid>
              </Body>
            </CardItem>
          </Card>

          <Card style={styles.record_item}>
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
          </Card>
        
          <Card style={styles.record_item}>
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
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <DynamicallySelectedPicker
                      items={mock_category}
                      transparentItemRows={1}
                      onScroll={setSelectedCategory}
                      height={130}
                      width={windowWidth}
                      fontSize={15}
                    />
                  </View>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <DynamicallySelectedPicker
                      items={mock_sub_option}
                      transparentItemRows={1}
                      onScroll={({ index, item }) => {
                        setSelectedSuboption(index);
                      }}
                      height={130}
                      width={windowWidth}
                      fontSize={15}
                    />
                  </View>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <DynamicallySelectedPicker
                      items={mock_Inspection}
                      transparentItemRows={1}
                      onScroll={setSelectedInspection}
                      height={130}
                      width={windowWidth}
                      fontSize={15}
                    />
                  </View>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <DynamicallySelectedPicker
                      items={mock_Damage}
                      transparentItemRows={1}
                      onScroll={({ index, item }) => {
                        console.log(index, item);
                        setSelectedDamage({ index, item });
                      }}
                      height={130}
                      width={windowWidth}
                      fontSize={15}
                    />
                  </View>
                </View>
              </Body>
            </CardItem>
          </Card>
          <Card style={styles.record_item}>
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
          <Card style={styles.record_item}>
            <CardItem header bordered>
              <Text>病害基本信息</Text>
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
                    <Text style={{ textAlign: "center" }}>案件编号</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ textAlign: "center" }}>车道</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ textAlign: "center" }}>巡查项目</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ textAlign: "center" }}>类别</Text>
                  </View>
                </View>
              </Body>
            </CardItem>
            {mock_reports.map((item) => render_basic_info_item(item))}
          </Card>
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical>
              <Icon name="images-outline" />
              <Text>相册</Text>
            </Button>
            <Button vertical>
              <Icon name="mic-outline" />
              <Text>录音</Text>
            </Button>
            <Button vertical active>
              <Icon active name="videocam-outline" />
              <Text>视频</Text>
            </Button>
            <Button vertical>
              <Icon name="camera-outline" />
              <Text>拍照</Text>
            </Button>
          </FooterTab>
        </Footer>

      </Container>
    </SafeAreaView>
  );
}

export default BasicReport;
