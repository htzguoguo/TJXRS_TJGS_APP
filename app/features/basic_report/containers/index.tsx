import React, { useCallback, useState } from 'react';
import { SafeAreaView, Dimensions, View } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import {
  Container,
  Content,
  Text,
  Icon,
  Footer,
  Button,
  Picker,
  Header,
} from 'native-base';
import { IProps } from '../types';
import { StandardHeader } from '../../../components/Header';
import { HighwaySelector, IHighwaySelectorData } from '../components/Highway';
import { IStationSelectorData, StationForm } from '../components/StationForm';
import { DiseaseForm, IDiseaseSelectorData } from '../components/DiseaseForm';
import { useDispatch, useSelector } from 'react-redux';
import { requestCreateBasicReport, requestUpdateBasicReport } from '../actions';

import { Field, FormSpy, Form } from 'react-final-form';
import { report_data } from '../components/reports_data';
import { ImageViewer } from '../components/ImageViewer';
import { padNumber } from '../../../utils/stringUtils';
import { tempFilesSelector } from '../../../store/file/selectors';
import { Lands_Data, Weather_Data } from '../components/highway_data';
import { highwaySelector } from '../../../store/highway/selectors';
import { getStationSummary } from '../helper';
import { bridgeSelector } from '../../../store/bridge/selectors';
import { stationSelector } from '../../../store/station/selectors';
import { FooterForm } from '../components/FooterForm';
import { ReportList } from '../components/ReportList';
import { IReportBasicInfo } from '../model';
import { emptyUploadFile, replaceUploadFile } from '../../../store/file/actions';
import { workloadSelector } from '../../../store/workload/selectors';
import { LaneForm } from '../components/LaneForm';

const initial_data_report = {
  report: report_data[0],
  date: new Date(),
}

function BasicReport(props: IProps) {
  const [
    selectedEditItem,
    setSelectedEditItem,
  ] = useState<IReportBasicInfo | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const tempSelectedFiles = useSelector(tempFilesSelector);
  const workloads = useSelector(workloadSelector);
  const highwayData = useSelector(highwaySelector);
  const bridgeFactory = useSelector(bridgeSelector);
  const stationFactory = useSelector(stationSelector);
  
  const [selectedCategory, setSelectedCategory] = useState<string>(
    workloads.initial_data.category,
  );

  const [selectedSuboption, setSelectedSuboption] = useState(
    workloads.initial_data.suboption,
  );

  const [selectedInspection, setSelectedInspection] = useState(
    workloads.initial_data.inspection,
  );

  const [selectedDamage, setSelectedDamage] = useState(workloads.initial_data.damage);

  const [selectedDefect, setSelectedDefect] = useState(workloads.initial_data.defect);

  const [selectedReportDate, setSelectedReportDate] = useState(initial_data_report);
  const [selectedHighway, setSelectedHighway] = useState<IHighwaySelectorData>(highwayData.initial_data);
  const [selectedStation, setSelectedStation] = useState<IStationSelectorData>({
    ...stationFactory.getDefaultData(selectedHighway.name),
    ...bridgeFactory.getDefaultData(selectedHighway.name),
  });
  const [selectedLane, setSelectedLane] = useState<string>(highwayData.initial_data.lane);

  const dispatch = useDispatch();

  const onPostBasicReport = () => {
    //const files = tempSelectedFiles.map((item) => ({ ...item, base64: '' }));
    const base = {
      ...selectedHighway,
      ...selectedReportDate,
      ...selectedStation,
      lane: selectedLane,
      category: selectedCategory,
      suboption: selectedSuboption,
      inspection: selectedInspection,
      damage: selectedDamage,
      defect: selectedDefect,
      files: tempSelectedFiles,
    };
    if (selectedEditItem && selectedEditItem.id) {
      dispatch(
        requestUpdateBasicReport({
          id: selectedEditItem.id,
          caseid: selectedEditItem.caseId,
          ...base,
        }),
      );
    } else {
      dispatch(requestCreateBasicReport(base));
    }
  };

  const onResetReport = () => {
    setSelectedReportDate(initial_data_report);
    setSelectedHighway(highwayData.initial_data)
    setSelectedStation({
      ...stationFactory.getDefaultData(selectedHighway.name),
      ...bridgeFactory.getDefaultData(selectedHighway.name),
    })
    setSelectedLane(highwayData.initial_data.lane);

    setSelectedCategory(workloads.initial_data.category);
    setSelectedSuboption(workloads.initial_data.suboption);
    setSelectedInspection(workloads.initial_data.inspection);
    setSelectedDamage(workloads.initial_data.inspection);
    setSelectedDefect(workloads.initial_data.defect);
    dispatch(emptyUploadFile());
  };

  const setSelectedEdit = useCallback((item: IReportBasicInfo) => {     
    setSelectedEditItem(item);
    setSelectedReportDate({
      report: item.report,
      date: item.date,
    });
    setSelectedHighway({
      weather: item.weather,
      name: item.name,
      direction: item.direction,
      lane: item.lane,
    });
    setSelectedLane(item.lane);
    setSelectedStation({
      stationType: item.stationType,
      kilometer: item.kilometer.toString(),
      meter: item.meter.toString(),
      endkilometer: item.endkilometer.toString(),
      endmeter: item.endmeter.toString(),
      station: item.station,
      staterange: item.staterange,
      subname: item.subname,
      stationOther: item.stationOther,
    });
    // setSelectedDiease({
    //   category: item.category,
    //   suboption: item.suboption,
    //   inspection: item.inspection,
    //   damage: item.damage,
    //   defect: item.defect,
    // });
    setSelectedCategory(item.category);
    setSelectedSuboption(item.suboption);
    setSelectedInspection(item.inspection);
    setSelectedDamage(item.inspection);
    setSelectedDefect(item.defect);
    dispatch(replaceUploadFile(item.files));
  }, []);

  const getHighwayData = useCallback((item) => {
    setSelectedHighway(item);

    setSelectedStation({
      ...selectedStation,
      station: stationFactory.getDefaultStation(item.name),
      staterange: bridgeFactory.getDefaultStationRange(item.name),
      subname: bridgeFactory.getDefaultSubName(item.name),
    });
  }, []);

  const getReportDateData = useCallback((item) => {
    setSelectedReportDate(item);
  }, []);  

  const getStationData = useCallback((item) => {
    setSelectedStation(item);
  }, []);

  const getLaneData = useCallback((item) => {
    setSelectedLane(item);
  }, []);

  const saveReport = () => (
    <View style={{flexDirection: 'row',  }}>
      <Button transparent onPress={onResetReport}>
        <Text>重置</Text>
      </Button>
      <Button transparent onPress={onPostBasicReport}>
        <Text>上报</Text>
      </Button>
    </View>
  );

  const headerBody = () => (
    <Form
      initialValues={selectedReportDate}
      onSubmit={() => {}}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Field
            name="report"
            render={(props) => (
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
                {report_data.map((item, index) => {
                  return <Picker.Item key={index} label={item} value={item} />;
                })}
              </Picker>
            )}></Field>

          <Field
            name="date"
            render={(props) => (
              <View
                style={{
                  justifyContent: 'flex-start',
                  alignItems: 'baseline',
                }}>
                <Button
                  warning
                  transparent={true}
                  onPress={() => setShowDatePicker(true)}>
                  <Text>{`${values.date.getFullYear()}${padNumber(
                    values.date.getMonth() + 1,
                  )}${values.date.getDate()}`}</Text>
                </Button>
                {showDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={props.input.value}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={(value, position) => {
                      setShowDatePicker(false);
                      props.input.onChange(position);
                    }}
                  />
                )}
              </View>
            )}></Field>
          <FormSpy
            subscription={{ values: true, valid: true }}
            onChange={(state) => {
              const { values, valid } = state;
              setSelectedReportDate(values);
            }}
          />
        </View>
      )}
    />
  );

  const getReportSummary = () => {
    const roadName = `${selectedHighway.weather},${selectedHighway.name},${selectedHighway.direction},${selectedLane}`;
    const station = getStationSummary(selectedStation, false);
    let defect = '';
    if (selectedDefect && selectedDefect.length > 0) {
      defect = `${selectedDefect[0].dealwithdesc},${selectedDefect[0].amount},${selectedDefect[0].unit}`;
    }
    return `${roadName},${station},${defect}`;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <StandardHeader isHome={true} body={headerBody} right={saveReport} />
        <Header   >
          <Button transparent>
            <Text  >{getReportSummary()}</Text>
          </Button>
        </Header>
        <Content style={{ padding: 1, backgroundColor: '#f4f4f4' }}>
          <HighwaySelector
            getData={getHighwayData}
            highway_data={highwayData}
            initial_data={selectedHighway}
            Lands_Data={Lands_Data}
            Weather_Data={Weather_Data}
          />
          <LaneForm setData={getLaneData} initial_data={selectedLane}  Lands_Data={Lands_Data}/>
          <StationForm
            bridgeFactory={bridgeFactory}
            stationFactory={stationFactory}
            highway_name={selectedHighway.name}
            getData={getStationData}
            initial_data={selectedStation}
          />
          <ImageViewer />
          <DiseaseForm            
            workload_data={workloads}
            // initial_data={selectedDiease}
            category={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setSelectedSuboption={setSelectedSuboption}
            setSelectedDamage={setSelectedDamage}
            setSelectedInspection={setSelectedInspection}
            setSelectedDefect={setSelectedDefect}
            suboption={selectedSuboption}
            inspection={selectedInspection}
            damage={selectedDamage}
            defect={selectedDefect}
          />
          <ReportList setSelected={setSelectedEdit} />
        </Content>
        <Footer>
          <FooterForm />
        </Footer>
      </Container>
    </SafeAreaView>
  );
}

export default BasicReport;
