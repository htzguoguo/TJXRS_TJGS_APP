import * as React from 'react';
import { Image, Platform } from 'react-native';
import {
  Container,
  Content,
  Header,
  Body,
  Title,
  Button,
  Text,
  View,
  Icon,
  Footer,
  Input,
  Item,
  Spinner,
  Toast
} from 'native-base';
import { Form, Field, } from 'react-final-form'
import createDecorator from 'final-form-focus'
import imagesConfig from '../../../config/images-config';
//import styles from "./styles";
import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from '../actions';
import { ILoginState } from '../types';
import NavigationService from 'app/navigation/NavigationService';
import { composeValidators, isAlphaNumeric, isMaxLength15, isMinLength6, isMinLength8, isRequired } from '../../../components/validateRules';

import { ILoading } from '../../../models/reducers/loading';
import { loginReducer } from '../reducers';


interface IState {
  loginReducer: ILoginState;
  loadingReducer: ILoading
}

interface IFormValues {
  name: string;
  password: string;
}

let focusOnError = createDecorator()

export default function Login() {
  const loginState = useSelector((state: IState) => state.loginReducer);
  const loadingState = useSelector((state: IState) => state.loadingReducer);
  const dispatch = useDispatch();
  const onLogin = (values: IFormValues,) => {
    dispatch(loginActions.requestLogin(values.name, values.password))
  };

  return (
    <Container>
      <Header style={{ height: 200, backgroundColor: '#FFF', borderWidth: 0 }}>
        <Body style={{ alignItems: 'center' }}>
          <Image
            style={{ height: 104, width: 104, resizeMode: 'contain' }}
            source={imagesConfig.login.header}
          />
          <Title style={{ color: '#000' }}>高速养护系统</Title>
          <View padder>
            <Text
              style={{ color: Platform.OS === 'ios' ? '#000' : '#FFF' }}
            ></Text>
          </View>
        </Body>
      </Header>
      <Content style={{ marginTop: 20 }}>
        <Form
          initialValues={{ name: 'admin123', password: '123456' }}
          onSubmit={onLogin}
          decorators={[focusOnError]}
        >
          {({ handleSubmit, pristine, submitting }) => (
            <View>
              <Field
                name="name"
                validate={isRequired}
                warn={isRequired}
              >
                {
                  field => (
                    <Item error={field.meta.error && field.meta.touched}>
                      <Icon
                        active
                        name="person-outline"
                      />
                      <Input
                        placeholder="用户名"
                        secureTextEntry={false}
                        {...field.input}
                      />
                      {field.meta.touched && field.meta.error && (
                        <Text>{field.meta.error}</Text>
                      )}
                    </Item>
                  )
                }
              </Field>
              <Field
                name="password"
                validate={composeValidators(isRequired, isAlphaNumeric, isMinLength6, isMaxLength15)}
                warn={composeValidators(isAlphaNumeric, isMinLength6, isMaxLength15)}
              >
                {
                  field => (
                    <Item error={field.meta.error && field.meta.touched}>
                      <Icon
                        active
                        name="lock-closed-outline"
                      />
                      <Input
                        placeholder="密码"
                        secureTextEntry={true}
                        {...field.input}
                      />
                      {field.meta.touched && field.meta.error && (
                        <Text>{field.meta.error}</Text>
                      )}
                    </Item>
                  )
                }
              </Field>
              <View padder>
                {
                  loadingState.isLoginLoading ? <Spinner /> :
                    <Button block onPress={handleSubmit}>
                      <Text>登录</Text>
                    </Button>
                }

              </View>
              {/* <View padder>
                {
                  loginState.error && loginState.error.length > 0 && Toast.show({
                    text: loginState.error,
                    buttonText: "关闭",
                    duration: 3000,
                    type: "warning"
                  })
                }
              </View> */}

            </View>
          )}
        </Form>
        {/* <View padder>
          <Button block onPress={onLogin}>
            <Text>登录</Text>
          </Button>
        </View> */}
      </Content>
      <Footer style={{ backgroundColor: '#F8F8F8' }}>
        <View
          style={{
            alignItems: 'center',
            opacity: 0.5,
            flexDirection: 'row',
          }}>
          <View padder>
            <Text style={{ color: '#000' }}>
              服务单位:天津市交通科学研究院{' '}
            </Text>
          </View>
          <Image
            source={imagesConfig.login.footer}
            style={{ width: 42, height: 42 }}
          />
        </View>
      </Footer>
    </Container>
  );
}




// class Login extends React.Component<Props, State> {
//   render() {

//   }
// }

// export default Login;
