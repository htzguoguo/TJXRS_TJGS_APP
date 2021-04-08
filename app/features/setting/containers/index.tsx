import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Badge, Body, Button, Container, Content, Footer, Header, Icon, Left, ListItem, Right, Separator, Spinner, Switch, Text } from 'native-base';

import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from '../../login/actions';
import * as workloadActions from '../../../store/workload/actions';
import * as highwayActions from '../../../store/highway/actions';
import * as bridgeActions from '../../../store/bridge/actions';
import * as stationActions from '../../../store/station/actions';
import styles from './styles';
import { IStoreState } from '../../../store/types';
import { StandardHeader } from '../../../components/Header/StandardHeader';
import { emptyUploadFile } from '../../../store/file/actions';
import { emptyReportList, nullEditReport } from '../../basic_report/actions';


const Home: React.FC = (props) => {
  const loadingState = useSelector((state: IStoreState) => state.loadingReducer);
  const workloadState = useSelector((state: IStoreState) => state.workloadReducer);
  const highwayState = useSelector((state: IStoreState) => state.highwayReducer);
  const bridgeState = useSelector((state: IStoreState) => state.bridgeReducer);
  const stationState = useSelector((state: IStoreState) => state.stationReducer);
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(emptyUploadFile());
    dispatch(emptyReportList());
    dispatch(nullEditReport());
    dispatch(loginActions.logOut());
  }
  const onQueryWorkload = () => dispatch(workloadActions.requestQueryWorkloads());
  const onQueryHighway = () => dispatch(highwayActions.requestQueryHighway());
  const onQueryBridge = () => dispatch(bridgeActions.requestQueryBridgeSubName());
  const onQueryStation = () => dispatch(stationActions.requestQueryStationSubName());
  const renderBasicDataItem = (onRequest: () => void, count: number, title: string) => {
    return (

      <ListItem icon onPress={onRequest}>
        <Left>
          <Button   >
            <Icon name="archive" />
          </Button>
        </Left>
        <Body>
          <Text>{title}</Text>
        </Body>
        <Right>
          {
            count > 0 ?
              <Badge success>
                <Text>{count}</Text>
              </Badge> :
              <Badge danger>
                <Text>{count}</Text>
              </Badge>
          }

        </Right>
      </ListItem>
    );
  }

  return (
    <Container style={styles.container}>
      <StandardHeader isHome={false} body='设置' />
      {
        
          <Content>
            <Separator bordered ><Text>基础数据</Text></Separator>
            {renderBasicDataItem(onQueryHighway, highwayState.highway_count, '道路基础数据')}
            {renderBasicDataItem(onQueryWorkload, workloadState.workloads_count, '病害类型基础数据')}
            {renderBasicDataItem(onQueryBridge, bridgeState.bridge_count, '桥梁基础数据')}
            {renderBasicDataItem(onQueryStation, stationState.station_count, '站区基础数据')}
            <Separator bordered />
            <ListItem icon>
              <Left>
                <Button  >
                  <Icon name="person" />
                </Button>
              </Left>
              <Body>
                <Text>个人信息</Text>
              </Body>
              <Right>
                <Text>On</Text>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem icon onPress={onLogout}>
              <Left>
                <Button   >
                  <Icon name="flag" />
                </Button>
              </Left>
              <Body>
                <Text>退出</Text>
              </Body>
              <Right>
                <Text></Text>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
          </Content>
      }
    </Container>
  );
};

export default Home;
