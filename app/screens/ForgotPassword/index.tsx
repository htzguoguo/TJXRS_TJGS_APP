import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import {navigationService} from '../../navigation/NavigationService';

import styles from './styles';
const Home: React.FC = () => {
  const goBack = () => navigationService.goBack();
  return (
    <View style={styles.container}>
      <Button icon="keyboard-backspace" mode="outlined" onPress={goBack}>
        Go Back
      </Button>
    </View>
  );
};

export default Home;
