import * as React from "react";
import {Text, View, SafeAreaView, Image, TouchableOpacity} from "react-native";
import {  
  DrawerContentScrollView,  
} from "@react-navigation/drawer";
import imageConfig from "../config/images-config";
import * as loginActions from '../features/login/actions';
  import { navigationService } from "./NavigationService";
import { useDispatch } from "react-redux";

export function CustomDrawerMenu(props) {
  const dispatch = useDispatch();
  const onLogout = () => dispatch(loginActions.logOut());
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{height: 150, alignItems: "center", justifyContent: "center"}}>
        <Image
          source={imageConfig.icons.profile}
          style={{height: 120, width: 120, borderRadius: 60}}></Image>
      </View>
      <DrawerContentScrollView {...props} style={{marginLeft: 5}}>
        <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => navigationService.goBlankPage()}>
          <Text>视频监控</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => navigationService.goBasicReport()}>
          <Text>巡查上报</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => navigationService.goBlankPage()}>
          <Text>维修反馈</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => navigationService.goSample()}>
          <Text>验收反馈</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => navigationService.goBlankPage()}>
          <Text>应急派单</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => navigationService.goBlankPage()}>
          <Text>设置</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => onLogout}>
          <Text>退出</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}
