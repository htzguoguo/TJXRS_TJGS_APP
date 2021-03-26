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
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera, launchImageLibrary, MediaType } from 'react-native-image-picker';
import {
  Container,
  Content,
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
  Picker,
  Header,
} from "native-base";
import styles from "./styles";
import {
  IProps,
} from "../types";
import { StandardHeader } from "../../../components/Header";
import { HighwaySelector, IHighwaySelectorData } from "../components/Highway";
import { IStationSelectorData, StationForm } from "../components/StationForm";
import { DiseaseForm } from "../components/DiseaseForm_b";
import { useDispatch, useSelector } from "react-redux";
import { requestCreateBasicReport } from '../actions';
import { deleteUploadFile, requestUploadFile } from "../../../store/file/actions";
import { Field, FormSpy, Form } from "react-final-form";
import { report_data } from "../components/reports_data";
import { ImageViewer } from "../components/ImageViewer";
import { padNumber } from "../../../utils/stringUtils";
import { tempFilesSelector } from "../../../store/file/selectors";
import { Direction_Data, Highway_Data, Lands_Data, Weather_Data } from "../components/highway_data";
import { highwaySelector } from "../../../store/highway/selectors";


function BasicReport(props: IProps) {
  const windowWidth = Dimensions.get("window").width / 4;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const tempSelectedFiles = useSelector((tempFilesSelector));
  const highwayData = useSelector(highwaySelector);
  const [selectedDiease, setSelectedDiease] = useState({});
  const [selectedReportDate, setSelectedReportDate] = useState({ report: report_data[0], date: new Date() });
  const [selectedHighway, setSelectedHighway] = useState<IHighwaySelectorData>({ weather: Weather_Data[0], name: highwayData.getDefaultName(), direction: highwayData.getDefaultDirection(), lane: Lands_Data[0] });
  const [selectedStation, setSelectedStation] = useState<IStationSelectorData>({ stationType: '道路桩号', kilometer: '0', meter: '0', endkilometer: '0', endmeter: '0' });
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

  const headerBody = () => (
    <Form
      initialValues={selectedReportDate}
      onSubmit={() => { }}
      render={
        ({ handleSubmit, form, submitting, pristine, values }) => (
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Field
              name="report"
              render={
                props => (

                  <Picker
                    mode="dropdown"
                    selectedValue={props.input.value}
                    onValueChange={
                      (value, position) => {
                        props.input.onChange(value)
                      }
                    }
                    iosIcon={<Icon name="ios-arrow-down" />}
                    style={{ width: "90%" }}
                    placeholder="选择"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff">
                    {
                      report_data.map(
                        (item, index) => {
                          return <Picker.Item key={index} label={item} value={item} />
                        }
                      )
                    }
                  </Picker>

                )
              }
            >
            </Field>

            <Field
              name="date"
              render={
                props => (
                  <View style={{ justifyContent: 'flex-start', alignItems: 'baseline' }}>
                    <Button warning transparent={true} onPress={() => setShowDatePicker(true)}  >
                      <Text>{`${values.date.getFullYear()}${padNumber(values.date.getMonth() + 1)
                        }${values.date.getDate()}`}</Text>
                    </Button>
                    {showDatePicker && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={props.input.value}
                        mode='date'
                        is24Hour={true}
                        display="default"
                        onChange={
                          (value, position) => {
                            setShowDatePicker(false)
                            props.input.onChange(position)
                          }
                        }
                      />
                    )}
                  </View>
                )
              }
            >
            </Field>
            <FormSpy
              subscription={{ values: true, valid: true }}
              onChange={(state) => {
                const { values, valid } = state
                setSelectedReportDate(values)
              }} />
          </View>
        )
      }
    />
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

  const getReportSummary = () => {
    const roadName = `${selectedHighway.weather},${selectedHighway.name},${selectedHighway.direction},${selectedHighway.lane}`;
    const station = `K${selectedStation.kilometer}+${selectedStation.meter}`;
    let defect = '';
    if (selectedDiease && selectedDiease.defect && selectedDiease.defect.length > 0) {
      defect = `${selectedDiease.defect[0].dealwithdesc},${selectedDiease.defect[0].amount},${selectedDiease.defect[0].unit}`
    }
    return `${roadName},${station},${defect}`;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <StandardHeader isHome={true} body={headerBody} right={saveReport} />
        <Header  >
          <Button transparent >
            <Text>{getReportSummary()}</Text>
          </Button>
        </Header>
        <Content style={{ padding: 1, backgroundColor: '#f4f4f4' }}>
          <HighwaySelector getData={getHighwayData} highway_data={highwayData} initial_data={selectedHighway} Lands_Data={Lands_Data} Weather_Data={Weather_Data} />
          <StationForm getData={getStationData} initial_data={selectedStation} />
          <ImageViewer />
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
