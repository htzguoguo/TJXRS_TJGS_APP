import * as React from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body,
} from "native-base";
import {useRoute, useNavigation} from "@react-navigation/native";
import styles from "./styles";
export interface Props {
  navigation: any;
}
export interface State {}

export default function BlankPage() {
  const route = useRoute();
  const navigation = useNavigation();
  const param = route.params;
  return (
    <Container style={styles.container}>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="ios-arrow-back" />
          </Button>
        </Left>
        <Body style={{flex: 3}}>
          <Title>{param ? param.name.item : "Blank Page"}</Title>
        </Body>

        <Right />
      </Header>

      <Content padder>
        <Text>
          {param !== undefined
            ? param.name.item
            : "Create Something Awesome . . ."}
        </Text>
      </Content>
    </Container>
  );
}


