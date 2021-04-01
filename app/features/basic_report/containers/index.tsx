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
import { replaceUploadFile } from '../../../store/file/actions';
import { workloadSelector } from '../../../store/workload/selectors';

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
  const [selectedDiease, setSelectedDiease] = useState<IDiseaseSelectorData>(
    () => {
      const category = workloads.getDefaultCategory();
      const suboption = workloads.getDefaultSuboption(category);
      const inspection = workloads.getDefaultInspection(category, suboption);
      const damage = workloads.getDefaultDamage(
        category,
        suboption,
        inspection,
      );
      const defect = workloads.getDefaultDefect(
        category,
        suboption,
        inspection,
        damage,
      );
      return {
        category,
        suboption,
        inspection,
        damage,
        defect,
      };
    },
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    selectedDiease.category,
  );

  const [selectedSuboption, setSelectedSuboption] = useState(
    selectedDiease.suboption,
  );

  const [selectedInspection, setSelectedInspection] = useState(
    selectedDiease.inspection,
  );

  const [selectedDamage, setSelectedDamage] = useState(selectedDiease.damage);

  const [selectedDefect, setSelectedDefect] = useState(selectedDiease.defect);

  const [selectedReportDate, setSelectedReportDate] = useState({
    report: selectedEditItem ? selectedEditItem.report : report_data[0],
    date: new Date(),
  });
  const [selectedHighway, setSelectedHighway] = useState<IHighwaySelectorData>({
    weather: Weather_Data[0],
    name: highwayData.getDefaultName(),
    direction: highwayData.getDefaultDirection(),
    lane: Lands_Data[0],
  });
  const [selectedStation, setSelectedStation] = useState<IStationSelectorData>({
    stationType: '道路桩号',
    kilometer: '0',
    meter: '0',
    endkilometer: '0',
    endmeter: '0',
    station: stationFactory.getDefaultStation(selectedHighway.name),
    staterange: bridgeFactory.getDefaultStationRange(selectedHighway.name),
    subname: bridgeFactory.getDefaultSubName(selectedHighway.name),
    stationOther: '',
  });
  const dispatch = useDispatch();

  const onPostBasicReport = () => {
    //const files = tempSelectedFiles.map((item) => ({ ...item, base64: '' }));
    const base = {
      ...selectedHighway,
      ...selectedReportDate,
      ...selectedStation,
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
    
  };

  const setSelectedEdit = useCallback((item: IReportBasicInfo) => {
    console.log('setSelectedEdit', item);
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
    setSelectedDiease({
      category: item.category,
      suboption: item.suboption,
      inspection: item.inspection,
      damage: item.damage,
      defect: item.defect,
    });
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

  const getDieaseData = useCallback((item) => {
    console.log('getDieaseData', item);
    setSelectedDiease(item);
  }, []);

  const getStationData = useCallback((item) => {
    setSelectedStation(item);
  }, []);

  const saveReport = () => (
    <View style={{flexDirection: 'row'}}>
      <Button transparent onPress={onResetReport}>
        <Text>重置</Text>
      </Button>
      <Button transparent onPress={onPostBasicReport}>
        <Text>保存</Text>
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
    const roadName = `${selectedHighway.weather},${selectedHighway.name},${selectedHighway.direction},${selectedHighway.lane}`;
    const station = getStationSummary(selectedStation);
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
        <Header>
          <Button transparent>
            <Text>{getReportSummary()}</Text>
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
          <StationForm
            bridgeFactory={bridgeFactory}
            stationFactory={stationFactory}
            highway_name={selectedHighway.name}
            getData={getStationData}
            initial_data={selectedStation}
          />
          <ImageViewer />
          <DiseaseForm
            getData={getDieaseData}
            workload_data={workloads}
            initial_data={selectedDiease}
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
