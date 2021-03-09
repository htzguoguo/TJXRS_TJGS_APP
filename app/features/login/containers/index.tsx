import * as React from 'react';
import { Image, ImageBackground, Platform } from 'react-native';
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
import styles from "./styles";
import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from '../actions';
import { ILoginState } from '../types';
import { composeValidators, isAlphaNumeric, isMaxLength15, isMinLength6, isMinLength8, isRequired } from '../../../components/validateRules';

import { ILoading } from '../../../models/reducers/loading';
import { loginReducer } from '../reducers';
import { ImageOverlay } from '../../../components/image-overlay.component';
import { InputForm } from '../components/InputForm';


interface IState {
  loginReducer: ILoginState;
  loadingReducer: ILoading
}

export interface IFormValues {
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
      <ImageBackground resizeMode='cover' style={styles.backgroundImage_container} source={imagesConfig.login.backgroundImage}>

      </ImageBackground>

      <Content style={{ marginTop: 20, borderWidth: 0 }}>
        <InputForm onLogin={onLogin} isLoginLoading={loadingState.isLoginLoading} />
      </Content>
      <Footer style={{ backgroundColor: '#FFF', borderWidth: 0 }}>
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
