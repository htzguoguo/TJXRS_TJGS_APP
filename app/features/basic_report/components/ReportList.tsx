
import {
  Body,
  Button,
  CardItem,
  Icon,
  Left,
  Right,
  SwipeRow,
  Text,
  View,
} from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import React from 'react';
import { StyleSheet, TouchableHighlight, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { IReportBasicInfo } from '../model';
import { reportSelector } from '../selectors';
import basic_styles from '../styles';
import { requestDeleteBasicReport } from '../actions';

interface IProps {
  setSelected: (item: IReportBasicInfo) => void;
}

export const ReportList = (comProps: IProps) => {
  const dispatch = useDispatch();
  const onDeleteBasicReport = (entity) => {    
    dispatch(requestDeleteBasicReport(entity));
  };
  const reports = useSelector(reportSelector);
  const copyed = reports.map((item, index) => ({ ...item, key: `report_list_${index}` }));
  const render_basic_info_item = (item: IReportBasicInfo) => {
    return (
      <SwipeRow
        leftOpenValue={75}
        rightOpenValue={-75}
        left={
          <Button success bordered onPress={() => comProps.setSelected(item)}>
            <Text>编辑</Text>
          </Button>
        }
        body={
          <CardItem bordered>
            <Body>
              <View
                key={item.caseId}
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text style={{ textAlign: 'center', fontSize: 12 }}>
                    {item.caseId}
                  </Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text style={{ textAlign: 'center', fontSize: 12 }}>
                    {item.lane}
                  </Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text style={{ textAlign: 'center', fontSize: 12 }}>
                    {item.category}
                  </Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text style={{ textAlign: 'center', fontSize: 12 }}>
                    {item.suboption}
                  </Text>
                </View>
              </View>
            </Body>
          </CardItem>
        }
        right={
          <Button danger bordered onPress={() => console.log('Trash')}>
            <Text>删除</Text>
          </Button>
        }
      />
    );
  };

  const renderItem = (data) => (
    <TouchableHighlight
      onPress={() => console.log('You touched me')}
      style={styles.rowFront}
      underlayColor={'white'}>
      <View
        key={data.item.caseId}
        style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center', fontSize: 12 }}>
            {data.item.caseId}
          </Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center', fontSize: 12 }}>
            {data.item.lane}
          </Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center', fontSize: 12 }}>
            {data.item.category}
          </Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center', fontSize: 12 }}>
            {data.item.suboption}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    // const newData = [...listData];
    // const prevIndex = listData.findIndex(item => item.key === rowKey);
    // newData.splice(prevIndex, 1);
    // setListData(newData);
  };

  const onRowDidOpen = (rowKey) => {
    console.log('This row opened', rowKey);
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
      >
        <Button success onPress={
          () => {
            comProps.setSelected(data.item);
            closeRow(rowMap, data.item.key)
          }
        }>
          <Text>编辑</Text>
        </Button>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
      >
        <Button danger onPress={
          () => {
            Alert.alert(
              "提示",
              `确定要删除编号为[${data.item.caseId}]的记录?`,
              [
                {
                  text: "取消",
                  onPress: () => deleteRow(rowMap, data.item.key),
                  style: "cancel"
                },
                {
                  text: "确定", onPress: () => {
                    onDeleteBasicReport(data.item);
                    deleteRow(rowMap, data.item.key);                    
                  }
                }
              ]
            );
          }
        }>
          <Text>删除</Text>
        </Button>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.view_container, { marginBottom: 5 }]}>
      <CardItem header bordered>
        <Text>上报信息</Text>
      </CardItem>
      <CardItem bordered>
        <Body>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ textAlign: 'center' }}>案件编号</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ textAlign: 'center' }}>车道</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ textAlign: 'center' }}>类别</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ textAlign: 'center' }}>分项名称</Text>
            </View>
          </View>
        </Body>
      </CardItem>
      <SwipeListView
        data={copyed}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-150}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
      />
      {/* <SwipeListView
        data={copyed}
        renderItem={(data, rowMap) => (<View
          key={data.item.caseId}
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <View style={{ flex: 1, justifyContent: "center" }}>

            <Text style={{ textAlign: "center", fontSize: 12 }}>
              {data.item.caseId}
            </Text>

          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ textAlign: "center", fontSize: 12 }}>
              {data.item.lane}
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ textAlign: "center", fontSize: 12 }}>
              {data.item.category}
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ textAlign: "center", fontSize: 12 }}>
              {data.item.suboption}
            </Text>
          </View>
        </View>)}
        renderHiddenItem={(data, rowMap) => (
          <View >
            <Text>Left</Text>
            <Text>Right</Text>
          </View>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
      /> */}
      {/* {reports.map((item) => render_basic_info_item(item))} */}
    </View>
  );
};

const styles = StyleSheet.create({
  ...basic_styles,
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    right: 75,
  },
  backRightBtnRight: {
    right: 0,
  },
});
