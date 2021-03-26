import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Badge, Body, Button, Container, Content, Footer, Header, Icon, Left, ListItem, Right, Separator, Spinner, Switch, Text } from 'native-base';

import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from '../../login/actions';
import * as workloadActions from '../../../store/workload/actions';
import * as highwayActions from '../../../store/highway/actions';
import styles from './styles';
import { IStoreState } from '../../../store/types';
import { StandardHeader } from '../../../components/Header/StandardHeader';


const Home: React.FC = (props) => {
  const loadingState = useSelector((state: IStoreState) => state.loadingReducer);
  const workloadState = useSelector((state: IStoreState) => state.workloadReducer);
  const highwayState = useSelector((state: IStoreState) => state.highwayReducer);
  const dispatch = useDispatch();
  const onLogout = () => dispatch(loginActions.logOut());
  const onQueryWorkload = () => dispatch(workloadActions.requestQueryWorkloads());
  const onQueryHighway = () => dispatch(highwayActions.requestQueryHighway());

  const renderBasicDataItem = (onRequest: () => void, count: number, title: string) => {
    return (
      loadingState.isLoading ? <Spinner /> :
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
      <Content>
        <Separator bordered ><Text>基础数据</Text></Separator>
        {renderBasicDataItem(onQueryHighway, highwayState.highway_count, '道路基础数据')}
        {renderBasicDataItem(onQueryWorkload, workloadState.workloads_count, '病害类型基础数据')}
        {/* {
          loadingState.isLoading ? <Spinner /> :
            <ListItem icon onPress={onQueryHighway}>
              <Left>
                <Button   >
                  <Icon name="archive" />
                </Button>
              </Left>
              <Body>
                <Text>道路基础数据</Text>
              </Body>
              <Right>
                {
                  highwayState.highway_count > 0 ?
                    <Badge success>
                      <Text>{highwayState.highway_count}</Text>
                    </Badge> :
                    <Badge danger>
                      <Text>{highwayState.highway_count}</Text>
                    </Badge>
                }

              </Right>
            </ListItem>
        }
        {
          loadingState.isLoading ? <Spinner /> :
            <ListItem icon onPress={onQueryWorkload}>
              <Left>
                <Button   >
                  <Icon name="archive" />
                </Button>
              </Left>
              <Body>
                <Text>病害类型基础数据</Text>
              </Body>
              <Right>
                {
                  workloadState.workloads_count > 0 ?
                    <Badge success>
                      <Text>{workloadState.workloads_count}</Text>
                    </Badge> :
                    <Badge danger>
                      <Text>{workloadState.workloads_count}</Text>
                    </Badge>
                }

              </Right>
            </ListItem>
        } */}
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
    </Container>

  );
};

export default Home;
