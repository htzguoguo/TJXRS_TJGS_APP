/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'; 
import React from 'react';
import Swiper from 'react-native-swiper';
// var Detail = require('./ProDetails');

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';

const sliderImgs1 = [
  'http://images3.c-ctrip.com/SBU/apph5/201505/16/app_home_ad16_640_128.png',
  'http://images3.c-ctrip.com/rk/apph5/C1/201505/app_home_ad49_640_128.png',
  'http://images3.c-ctrip.com/rk/apph5/D1/201506/app_home_ad05_640_128.jpg'
];

const BUIcon = [
  'https://raw.githubusercontent.com/vczero/vczero.github.io/master/ctrip/%E6%9C%AA%E6%A0%87%E9%A2%98-1.png',
  'https://raw.githubusercontent.com/vczero/vczero.github.io/master/ctrip/feiji.png',
  'https://raw.githubusercontent.com/vczero/vczero.github.io/master/ctrip/lvyou.png',
  'https://raw.githubusercontent.com/vczero/vczero.github.io/master/ctrip/gonglue.png'

];

const Images = [
  'http://webresource.c-ctrip.com/ResCRMOnline/R5/html5/images/zzz_pic_salead01.png',
  'http://images3.c-ctrip.com/rk/apph5/B1/201505/app_home_ad06_310_120.jpg'
];

const sliderImgs = [
  'http://images3.c-ctrip.com/SBU/apph5/201505/16/app_home_ad16_640_128.png',
  'http://images3.c-ctrip.com/rk/apph5/C1/201505/app_home_ad49_640_128.png',
  'http://images3.c-ctrip.com/rk/apph5/D1/201506/app_home_ad05_640_128.jpg'
];
const Slider = () => {   
    return (
      <Swiper style={styles.wrapper} showsButtons={false} autoplay={true} height={150} showsPagination={false}>
        <Image style={[styles.slide,]} source={{ uri: sliderImgs[0] }}></Image>
        <Image style={[styles.slide,]} source={{ uri: sliderImgs[1] }}></Image>
        <Image style={[styles.slide,]} source={{ uri: sliderImgs[2] }}></Image>
      </Swiper>
    );  
};


export const AppHome = () => {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Slider />

          <View style={[styles.sbu_red, styles.sbu_view]}>
            <TouchableHighlight underlayColor={'#FA6778'} style={{ flex: 1 }}>
              <View style={[styles.sbu_flex, styles.sbu_borderRight]}>
                <View style={[styles.sub_con_flex, styles.sub_text]}>
                  <Text style={[styles.font16]}>??????</Text>
                </View>
                <View style={[styles.sub_con_flex]}>
                  <Image style={[styles.sbu_icon_img]} source={{ uri: BUIcon[0] }}></Image>
                </View>
              </View>
            </TouchableHighlight>
            <View style={[styles.sbu_flex, styles.sbu_borderRight]}>
              <View style={[styles.sub_con_flex, styles.sub_text, styles.sbu_borderBottom]}>
                <Text style={[styles.font16]}>??????</Text>
              </View>
              <View style={[styles.sub_con_flex, styles.sub_text]}>
                <Text style={[styles.font16]}>??????</Text>
              </View>
            </View>
            <View style={[styles.sbu_flex]}>
              <View style={[styles.sub_con_flex, styles.sub_text, styles.sbu_borderBottom]}>
                <Text style={[styles.font16]}>??????.??????</Text>
              </View>
              <View style={[styles.sub_con_flex, styles.sub_text]}>
                <Text style={[styles.font16]}>??????.??????</Text>
              </View>
            </View>
          </View>

          <View style={[styles.sbu_view, styles.sbu_blue]}>
            <View style={[styles.sbu_flex, styles.sbu_borderRight]}>
              <View style={[styles.sub_con_flex, styles.sub_text]}>
                <Text style={[styles.font16]}>??????</Text>
              </View>
              <View style={[styles.sub_con_flex]}>
                <Image style={[styles.sbu_icon_img]} source={{ uri: BUIcon[1] }}></Image>
              </View>
            </View>
            <View style={[styles.sbu_flex, styles.sbu_borderRight]}>
              <View style={[styles.sub_con_flex, styles.sub_text, styles.sbu_borderBottom]}>
                <Text style={[styles.font16]}>?????????</Text>
              </View>
              <View style={[styles.sub_con_flex, styles.sub_text]}>
                <Text style={[styles.font16]}>?????????</Text>
              </View>
            </View>
            <View style={[styles.sbu_flex]}>
              <View style={[styles.sub_con_flex, styles.sub_text, styles.sbu_borderBottom]}>
                <Text style={[styles.font16]}>?????????</Text>
              </View>
              <View style={[styles.sub_con_flex, styles.sub_text]}>
                <Text style={[styles.font16]}>??????.??????</Text>
              </View>
            </View>
          </View>

          <View style={[styles.sbu_view, styles.sbu_green]}>
            <View style={[styles.sbu_flex, styles.sbu_borderRight]}>
              <View style={[styles.sub_con_flex, styles.sub_text]}>
                <Text style={[styles.font16]}>??????</Text>
              </View>
              <View style={[styles.sub_con_flex]}>
                <Image style={[styles.sbu_icon_img]} source={{ uri: BUIcon[2] }}></Image>
              </View>
            </View>
            <View style={[styles.sbu_flex, styles.sbu_borderRight]}>
              <View style={[styles.sub_con_flex, styles.sub_text, styles.sbu_borderBottom]}>
                <Text style={[styles.font16]}>??????.??????</Text>
              </View>
              <View style={[styles.sub_con_flex, styles.sub_text]}>
                <Text style={[styles.font16]}>??????WiFi</Text>
              </View>
            </View>
            <View style={[styles.sbu_flex]}>
              <View style={[styles.sub_con_flex, styles.sub_text, styles.sbu_borderBottom]}>
                <Text style={[styles.font16]}>??????</Text>
              </View>
              <View style={[styles.sub_con_flex, styles.sub_text]}>
                <Text style={[styles.font16]}>??????</Text>
              </View>
            </View>
          </View>
          <View style={[styles.sbu_view, styles.sbu_yellow]}>
            <View style={[styles.sbu_flex, styles.sbu_borderRight]}>
              <View style={[styles.sub_con_flex, styles.sub_text]}>
                <Text style={[styles.font16]}>??????</Text>
              </View>
              <View style={[styles.sub_con_flex]}>
                <Image style={[styles.sbu_icon_img]} source={{ uri: BUIcon[3] }}></Image>
              </View>
            </View>
            <View style={[styles.sbu_flex, styles.sbu_borderRight]}>
              <View style={[styles.sub_con_flex, styles.sub_text, styles.sbu_borderBottom]}>
                <Text style={[styles.font16]}>?????????</Text>
              </View>
              <View style={[styles.sub_con_flex, styles.sub_text]}>
                <Text style={[styles.font16]}>?????????</Text>
              </View>
            </View>
            <View style={[styles.sbu_flex]}>
              <View style={[styles.sub_con_flex, styles.sub_text, styles.sbu_borderBottom]}>
                <Text style={[styles.font16]}>??????.??????</Text>
              </View>
              <View style={[styles.sub_con_flex, styles.sub_text]}>
                <Text style={[styles.font16]}>??????</Text>
              </View>
            </View>
          </View>
          <View style={[styles.img_view]}>
            <View style={[styles.img_flex, { borderRightWidth: 0.5 }]}>
              <Image style={[styles.img_wh]} source={{ uri: Images[0] }}></Image>
            </View>
            <View style={[styles.img_flex, { borderLeftWidth: 0, }]}>
              <Image style={[styles.img_wh]} source={{ uri: Images[1] }}></Image>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };
const styles = StyleSheet.create({
  //container
  container: {
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  //slider
  wrapper: {
    height: 80,
  },
  slide: {
    height: 80,
    resizeMode: 'contain',
  },
  //sbu
  sbu_view: {
    height: 84,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
  },
  sbu_red: {
    backgroundColor: '#FA6778',
    borderColor: '#FA6778',
    marginTop: -70,
  },

  sbu_blue: {
    backgroundColor: '#3D98FF',
    borderColor: '#3D98FF',
  },

  sbu_green: {
    backgroundColor: '#5EBE00',
    borderColor: '#5EBE00',
  },

  sbu_yellow: {
    backgroundColor: '#FC9720',
    borderColor: '#FC9720',
  },
  sbu_flex: {
    flex: 1,
  },
  sbu_borderRight: {
    borderColor: '#fff',
    borderRightWidth: 0.5,
  },
  sbu_icon_img: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  sub_con_flex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sub_text: {
    justifyContent: 'center',
  },
  font16: {
    fontSize: 17,
    color: '#FFF',
    fontWeight: '900',
  },
  sbu_borderBottom: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#fff',
  },
  img_view: {
    height: 62,
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  img_flex: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  img_wh: {
    height: 59,
    borderRightWidth: 0,
    resizeMode: 'contain',
  }
});










