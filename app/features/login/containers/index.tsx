import * as React from 'react';
import { Image, ImageBackground, Platform } from 'react-native';
import {
  Container,
  Content,

  Text,
  View,

  Footer,

} from 'native-base';

import createDecorator from 'final-form-focus'
import imagesConfig from '../../../config/images-config';
import styles from "./styles";
import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from '../actions';


import { InputForm } from '../components/InputForm';
import { IStoreState } from '../../../store/types';




export interface IFormValues {
  name: string;
  password: string;
}

let focusOnError = createDecorator()

export default function Login() {
  const loginState = useSelector((state: IStoreState) => state.loginReducer);
  const loadingState = useSelector((state: IStoreState) => state.loadingReducer);
  const dispatch = useDispatch();
  const onLogin = (values: IFormValues,) => {
    dispatch(loginActions.requestLogin(values.name, values.password))
  };

  return (
    <Container>
      <ImageBackground resizeMode='cover' style={styles.backgroundImage_container} source={imagesConfig.login.backgroundImage}>
      </ImageBackground>
      <Content style={{ marginTop: 20, borderWidth: 0 }}>
        <InputForm onLogin={onLogin} isLoading={loadingState.isLoading} />
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
