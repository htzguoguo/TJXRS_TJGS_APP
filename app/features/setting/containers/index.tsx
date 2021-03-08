import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Body, Button, Container, Content, Footer, Header, Icon, Left, ListItem, Right, Separator, Switch, Text } from 'native-base';

import { useDispatch } from 'react-redux';
import * as loginActions from '../../login/actions';
import styles from './styles';
const Home: React.FC = (props) => {
  const dispatch = useDispatch();
  const onLogout = () => dispatch(loginActions.logOut());

  return (
    <Container style={styles.container}>
      <Header />
      <Content>
      <Separator bordered   />
        <ListItem icon>
          <Left>
            <Button style={{ backgroundColor: "#007AFF" }}>
              <Icon name="person" style={{ color: "#387ef5" }} />
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
            <Button style={{ backgroundColor: "#FF9501" }} >
              <Icon name="archive" style={{ color: "brown" }} />
            </Button>
          </Left>
          <Body>
            <Text>获取数据</Text>
          </Body>
          <Right>
            <Switch value={false} />
          </Right>
        </ListItem>
        <Separator bordered />
        <ListItem icon onPress={onLogout}>
          <Left>
            <Button style={{ backgroundColor: "#007AFF" }} >
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
