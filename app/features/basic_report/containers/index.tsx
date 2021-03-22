import React, { useCallback, useState } from "react";
import {
  SafeAreaView,
  Dimensions,
  View,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  StatusBar,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import DynamicallySelectedPicker from "react-native-dynamically-selected-picker";
import { launchCamera, launchImageLibrary, MediaType } from 'react-native-image-picker';
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
import styles from "./styles";
import {
  IProps,
} from "../types";
import { StandardHeader } from "../../../components/Header";
import imagesConfig from "../../../config/images-config";
import { HighwaySelector } from "../components/Highway";
import { ReporterSelector } from "../components/ReportDate";
import { StationForm } from "../components/StationForm";
import { DiseaseForm } from "../components/DiseaseForm_b";
import { useDispatch, useSelector } from "react-redux";
import { requestCreateBasicReport } from '../actions';
import { deleteUploadFile, requestUploadFile } from "../../../store/file/actions";
import { IStoreState } from "../../../store/types";
import { tempFilesSelector, tempImagesSelector } from "../selectors";
import GallerySwiper, { ImageObj } from "react-native-gallery-swiper";
import ApiConstants from "../../../api/ApiConstants";


function BasicReport(props: IProps) {
  const windowWidth = Dimensions.get("window").width / 4;
  const tempSelectedImages = useSelector((tempImagesSelector));
  const tempSelectedFiles = useSelector((tempFilesSelector)); 
  const [selectedDiease, setSelectedDiease] = useState({});
  const [selectedReportDate, setSelectedReportDate] = useState({});
  const [selectedHighway, setSelectedHighway] = useState({});
  const [selectedStation, setSelectedStation] = useState({});
  const dispatch = useDispatch();
  const onPostBasicReport = () => {
    const files = tempSelectedFiles.map(item => ({ ...item, base64: '' }))
    dispatch(requestCreateBasicReport({ ...selectedDiease, ...selectedHighway, ...selectedReportDate, ...selectedStation, files }))
  };

  const onDeleteUploadFile = (file) => {
    dispatch(deleteUploadFile(file));
  }

  const getHighwayData = useCallback((item) => {
    console.log('You clicked ', item);
    setSelectedHighway(item);
  }, []);

  const getReportDateData = useCallback((item) => {
    console.log('You clicked ', item);
    setSelectedReportDate(item);
  }, []);

  const getDieaseData = useCallback((item) => {
    console.log('You clicked ', item);
    setSelectedDiease(item);
  }, []);

  const getStationData = useCallback((item) => {
    console.log('You clicked ', item);
    setSelectedStation(item);
  }, []);

  const saveReport = () => (
    <Button transparent onPress={
      onPostBasicReport
    }>
      <Text>保存</Text>
    </Button>
  )

  const Image_Options = {
    mediaType: "photo",
    quality: 0.5,
    maxHeight: 2000,
    maxWidth: 2000,
    saveToPhotos: false,
    includeBase64: true,
  };

  function selectImageFromLibrary() {
    launchImageLibrary(Image_Options, response => {
      console.log({ response });
      if (response.didCancel) {

      } else if (response.errorCode) {
        Alert.alert('提示', response.errorCode);
      } else {
        console.log('launchImageLibrary', response);
        dispatch(requestUploadFile({ uri: response.uri!, type: response.type!, name: response.fileName!, base64: response.base64!, size: response.fileSize! }))
      }
    });
  }

  function takeImage() {
    launchCamera(Image_Options, response => {
      console.log({ response });
      if (response.didCancel) {

      } else if (response.errorCode) {
        console.log(response);
        Alert.alert('提示', response.errorCode);
      } else {
        console.log('launchCamera', response);
        dispatch(requestUploadFile({ uri: response.uri!, type: response.type!, name: response.fileName!, base64: response.base64!, size: response.fileSize! }))
      }
    });
  }

  function takeVideo() {
    const options = {
      mediaType: "video",
      videoQuality: 'low',
      durationLimit: 30,
    }
    launchCamera(options, response => {
      console.log({ response });
      if (response.didCancel) {

      } else if (response.errorCode) {
        console.log(response);
        Alert.alert('提示', response.errorCode);
      } else {
        console.log('launchCamera', response);
        dispatch(requestUploadFile({ uri: response.uri!, type: response.type!, name: response.fileName!, base64: response.base64!, size: response.fileSize! }))
      }
    });
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <Image
        source={{ uri: `${ApiConstants.FILE_BASE_URL}${item.savedName}` }}
        style={styles.maintain_image}></Image>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <StandardHeader isHome={true} body="巡查上报" right={saveReport} />
        <Content  style={{padding: 1}}>
          <Text>AAACCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC</Text>

          <ReporterSelector getData={getReportDateData} />
          <HighwaySelector getData={getHighwayData} />
          <StationForm getData={getStationData} />

          <View style={ styles.record_item}>
            {/* <CardItem header bordered>
              <Text>现场照片</Text>
            </CardItem> */}
            <CardItem >
              <Body>
                {
                  tempSelectedImages && tempSelectedImages.length > 0 ?
                    <FlatList
                      horizontal={true}
                      data={tempSelectedImages}
                      renderItem={
                        ({ item }) => (
                          <TouchableOpacity
                            onPress={
                              () => {
                                Alert.alert(
                                  "提示",
                                  "是否删除当前文件",
                                  [
                                    {
                                      text: "取消",
                                      style: "cancel"
                                    },
                                    { text: "确定", onPress: () => onDeleteUploadFile(item) }
                                  ]
                                );

                              }
                            }
                          >
                            <View style={styles.maintain_image_item}>
                              <Image
                                source={{ uri: `data:${item.type};base64,${item.base64}` }}
                                style={styles.maintain_image}></Image>
                            </View>
                          </TouchableOpacity>
                        )
                      }
                      keyExtractor={item => item.savedName}
                    /> :
                    <TouchableOpacity
                      onPress={
                        takeImage
                      }
                    >
                      <View style={styles.maintain_image_item}>
                        <Image
                          source={imagesConfig.report.add_image}
                          style={styles.maintain_image}></Image>
                      </View>
                    </TouchableOpacity>
                }

              </Body>
            </CardItem>
          </View>

          <View style={styles.record_item}>
            {/* <CardItem header bordered>
              <Text>最近录音</Text>
            </CardItem> */}
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

          <DiseaseForm getData={getDieaseData} />

        </Content>
        <Footer>
          <FooterTab>

            <Button vertical onPress={selectImageFromLibrary}>
              <Icon name="images-outline" />
              <Text>相册</Text>
            </Button>
            <Button vertical>
              <Icon name="mic-outline" />
              <Text>录音</Text>
            </Button>
            <Button vertical onPress={takeVideo}>
              <Icon active name="videocam-outline" />
              <Text>视频</Text>
            </Button>
            <Button onPress={takeImage} vertical>
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
