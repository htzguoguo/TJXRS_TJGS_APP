import * as React from 'react';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator} from "@react-navigation/drawer";
import { useSelector } from 'react-redux';

import { navigationRef } from './NavigationService';

import Login from '../features/login/containers';
import BasicReport from '../features/basic_report/containers';
import {CommodityList} from '../features/sample/containers/commodityList';
import {AppHome} from '../features/sample/containers/appHome';
import Setting from '../features/setting/containers';
import Home from 'app/screens/Home';
import ForgotPassword from 'app/screens/ForgotPassword';
 
import { StatusBar } from 'react-native';
import { ILoginState } from 'app/models/reducers/login';
 
import { MenuSidebar } from './MenuSidebar';
import BlankPage from '../features/blank/containers';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const LoggedInStack = createStackNavigator();
const MenuDrawer = createDrawerNavigator();

function MyMenuDrawer(){
  return (
    <MenuDrawer.Navigator
      drawerContent={(props) => <MenuSidebar {...props} />}
      initialRouteName="BasicReport">
      <MenuDrawer.Screen name="Home" component={Home} />
      <MenuDrawer.Screen name="BlankPage" component={BlankPage} />
      <MenuDrawer.Screen name="BasicReport" component={BasicReport} />
      <MenuDrawer.Screen name="Setting" component={Setting} />
      <MenuDrawer.Screen name="CommodityList" component={CommodityList} />
      <MenuDrawer.Screen name="AppHome" component={AppHome} />
    </MenuDrawer.Navigator>
  );
}

const homeOptions = {
  title: 'Home',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  // headerRight: () => <ThemeController />,
};

// const homeOptions = {
//   title: 'My home',
//   headerStyle: {
//     backgroundColor: '#f4511e',
//   },
//   headerTintColor: '#fff',
//   headerTitleStyle: {
//     fontWeight: 'bold',
//   },
// };

interface IState {
  loginReducer: ILoginState;
}

interface IProps {
  theme: Theme;
}

const AuthNavigator = () => {
  const isLoggedIn = useSelector(
    (state: IState) => state.loginReducer.isLoggedIn,
  );
  return (
    <AuthStack.Navigator
      headerMode="none"
    >
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{
          // When logging out, a pop animation feels intuitive
          // You can remove this if you want the default 'push' animation
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
          // headerRight: () => <ThemeController />,
        }}

      />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          // When logging out, a pop animation feels intuitive
          // You can remove this if you want the default 'push' animation
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
          // headerRight: () => <ThemeController />,
        }}
      />
    </AuthStack.Navigator>
  );
};

const LoggedInNavigator = () => (
  <LoggedInStack.Navigator>
    <Stack.Screen name="Home" component={Home} options={homeOptions} />
  </LoggedInStack.Navigator>
);

const App: React.FC<IProps> = (props: IProps) => {
  const { theme } = props;
  const isLoggedIn = useSelector(
    (state: IState) => state.loginReducer.isLoggedIn,
  );

  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />

      <Stack.Navigator
        headerMode="none"
        screenOptions={{gestureEnabled: false}}>
        {isLoggedIn ? (
          <Stack.Screen
            name="HomeApp"
            component={MyMenuDrawer}           
          />
        ) : (
            <Stack.Screen
              name="Login"
              component={AuthNavigator}
              options={{
                // When logging out, a pop animation feels intuitive
                // You can remove this if you want the default 'push' animation
                animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
                // headerRight: () => <ThemeController />,
              }}
            />
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
