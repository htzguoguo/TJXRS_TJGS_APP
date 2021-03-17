import React from 'react';
import { View } from 'react-native';
import { Text, Button, } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles';
import { ILoginState } from 'app/models/reducers/login';
import {navigationService} from 'app/navigation/NavigationService';
import { requestLogin } from '../../features/login/actions';

interface IState {
  loginReducer: ILoginState;
}

const Login: React.FC = () => {
  const id = useSelector((state: IState) => state.loginReducer.id);
  const dispatch = useDispatch();
  const onLogin = () => dispatch(requestLogin('test', '1234'));
  const onForgot = () => navigationService.navigate('ForgotPassword');
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.login}>Login Status : {id}</Text>
        <Button icon="login" mode="outlined" onPress={onLogin}>
          Login
        </Button>
        <Button
          mode="text"
          style={styles.forgot}
          labelStyle={styles.labelStyle}
          onPress={onForgot}>
          Forgot Password
        </Button>
      </View>
    </View>
  );
};

export default Login;
