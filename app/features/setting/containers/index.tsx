import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Badge, Body, Button, Container, Content, Footer, Header, Icon, Left, ListItem, Right, Separator, Spinner, Switch, Text } from 'native-base';

import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from '../../login/actions';
import * as settingActions from '../actions';
import styles from './styles';
import { IStoreState } from '../../../store/types';
 

const Home: React.FC = (props) => {
  const loadingState = useSelector((state: IStoreState) => state.loadingReducer);
  const settingState = useSelector((state: IStoreState) => state.settingReducer);
  const dispatch = useDispatch();
  const onLogout = () => dispatch(loginActions.logOut());
  const onQueryWorkload = () => dispatch(settingActions.requestQueryWorkloads());

  return (
    <Container style={styles.container}>
      <Header />
      <Content>
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
        {
          loadingState.isLoading ? <Spinner /> :
            <ListItem icon onPress={onQueryWorkload}>
              <Left>
                <Button   >
                  <Icon name="archive" />
                </Button>
              </Left>
              <Body>
                <Text>获取数据</Text>
              </Body>
              <Right>
                {
                  settingState.workloads_count > 0 ?
                    <Badge success>
                      <Text>{settingState.workloads_count}</Text>
                    </Badge> :
                    <Badge danger>
                      <Text>{settingState.workloads_count}</Text>
                    </Badge>
                }

              </Right>
            </ListItem>
        }
        <Separator bordered />
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
