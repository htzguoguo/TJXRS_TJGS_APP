import React, { useCallback, useState } from 'react';
import { SafeAreaView, Dimensions, View, Alert } from 'react-native';

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
import {
  HighwaySelector,
  IHighwaySelectorData,
} from '../components/HighwayForm';
import {
  IStationSelectorData,
  StationForm,
} from '../components/StationLaneForm';
import { DiseaseForm, IDiseaseSelectorData } from '../components/DiseaseForm';
import { useDispatch, useSelector } from 'react-redux';
import { nullEditReport, requestCreateBasicReport, requestUpdateBasicReport, setEditReport } from '../actions';

import { Field, FormSpy, Form } from 'react-final-form';
import { report_data } from '../components/reports_data';
import { ImageViewer } from '../components/ImageViewer';
import { padNumber } from '../../../utils/stringUtils';
import { tempFilesSelector } from '../../../store/file/selectors';
import { Lands_Data, Weather_Data } from '../components/highway_data';
import { highwaySelector } from '../../../store/highway/selectors';
import { getFirstAvalibleDefect, getStationSummary } from '../helper';
import { bridgeSelector } from '../../../store/bridge/selectors';
import { stationSelector } from '../../../store/station/selectors';
import { FooterForm } from '../components/FooterForm';
import { ReportList } from '../components/ReportList';
import { IReportBasicInfo } from '../model';
import {
  emptyUploadFile,
  replaceUploadFile,
} from '../../../store/file/actions';
import { workloadSelector } from '../../../store/workload/selectors';
import { LaneForm } from '../components/LaneForm';
import { ReporterSelector } from '../components/ReportDate';
import { editReportSelector } from '../selectors';

const initial_data_report = {
  report: report_data[0],
  date: new Date(),
  weather: Weather_Data[0],
};

function BasicReport(props: IProps) {
  // const [
  //   selectedEditItem,
  //   setSelectedEditItem,
  // ] = useState<IReportBasicInfo | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const tempSelectedFiles = useSelector(tempFilesSelector);

  const selectedEditItem = useSelector(editReportSelector);
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

  const [selectedDamage, setSelectedDamage] = useState(
    workloads.initial_data.damage,
  );

  const [selectedDefect, setSelectedDefect] = useState(
    workloads.initial_data.defect,
  );

  const [selectedReportDate, setSelectedReportDate] = useState(
    initial_data_report,
  );
  const [selectedHighway, setSelectedHighway] = useState<IHighwaySelectorData>(
    highwayData.initial_data,
  );
  const [selectedStation, setSelectedStation] = useState<IStationSelectorData>({
    ...stationFactory.getDefaultData(selectedHighway.name),
    ...bridgeFactory.getDefaultData(selectedHighway.name),
  });
  const [selectedLane, setSelectedLane] = useState<string>(
    highwayData.initial_data.lane,
  );

  const dispatch = useDispatch();

  const onPostBasicReport = async () => {   
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
    //setSelectedEditItem(null);

    setSelectedReportDate(initial_data_report);
    setSelectedHighway(highwayData.initial_data);
    setSelectedStation({
      ...stationFactory.getDefaultData(selectedHighway.name),
      ...bridgeFactory.getDefaultData(selectedHighway.name),
    });
    setSelectedLane(highwayData.initial_data.lane);

    setSelectedCategory(workloads.initial_data.category);
    setSelectedSuboption(workloads.initial_data.suboption);
    setSelectedInspection(workloads.initial_data.inspection);
    setSelectedDamage(workloads.initial_data.inspection);
    setSelectedDefect(workloads.initial_data.defect);
    dispatch(emptyUploadFile());
    dispatch(nullEditReport());
  };

  const setSelectedEdit = useCallback((item: IReportBasicInfo) => {
    dispatch(setEditReport(item));
   // setSelectedEditItem(item);
    setSelectedReportDate({
      report: item.report,
      date: item.date,
      weather: item.weather,
    });
    setSelectedHighway({
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
    <View style={{ flexDirection: 'row' }}>
      <Button
        transparent
        onPress={() => {
          Alert.alert('提示', `确定要清除输入内容?`, [
            {
              text: '取消',
              style: 'cancel',
            },
            {
              text: '确定',
              onPress: () => {
                onResetReport();
              },
            },
          ]);
        }}>
        <Text>重置</Text>
      </Button>
      <Button
        transparent
        onPress={() => {
          const title = selectedEditItem
            ? `确定要更新编号为[${selectedEditItem.caseId}]的记录?`
            : `确定要上报记录?`;
          Alert.alert('提示', `${title}`, [
            {
              text: '取消',
              style: 'cancel',
            },
            {
              text: '确定',
              onPress: () => {
                onPostBasicReport();
              },
            },
          ]);
        }}>
        <Text>{selectedEditItem ? '更新' : '上报'}</Text>
      </Button>
    </View>
  );

  const getReportSummary = () => {
    const roadName = `${selectedHighway.name},${selectedHighway.direction},${selectedLane}`;
    const station = getStationSummary(selectedStation, false);
    let defect = '';
    let foundDefect = getFirstAvalibleDefect(selectedDefect);
    if (foundDefect) {
      defect = `${foundDefect.dealwithdesc},${foundDefect.amount},${foundDefect.unit}`;
    }
    return `${roadName},${station},${defect}`;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <StandardHeader isHome={true} body={'巡查上报'} right={saveReport} />
        <Header>
          <Button transparent>
            <Text>{getReportSummary()}</Text>
          </Button>
        </Header>
        <Content style={{ padding: 1, backgroundColor: '#f4f4f4' }}>
          <ReporterSelector
            getData={getReportDateData}
            Weather_Data={Weather_Data}
            report_data={report_data}
            initial_data={selectedReportDate}
          />
          <HighwaySelector
            getData={getHighwayData}
            highway_data={highwayData}
            initial_data={selectedHighway}            
          />
          {/* <LaneForm
            setData={getLaneData}
            initial_data={selectedLane}
            Lands_Data={Lands_Data}
          /> */}
          <StationForm
            setLaneData={getLaneData}
            initial_lane_data={selectedLane}
            Lands_Data={Lands_Data}
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

