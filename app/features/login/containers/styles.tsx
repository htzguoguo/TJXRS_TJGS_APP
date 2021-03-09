import { Dimensions, StyleSheet } from 'react-native';

const deviceHeight = Dimensions.get('window').height;

const styles: any = StyleSheet.create({
  backgroundImage_container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FBFAFA',
  },
  shadow: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  bg: {
    flex: 1,
    marginTop: deviceHeight / 1.75,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
  },
  input: {
    marginBottom: 20,
  },
  btn: {
    marginTop: 20,
    alignSelf: 'center',
  },
});
export default styles;
