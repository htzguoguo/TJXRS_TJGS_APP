import { Body, Button, CardItem, Text, View } from "native-base"
import ImageZoomViewer from 'react-native-image-zoom-viewer';
import Video from 'react-native-video';
import Modal from 'react-native-modal';
import React, { useState } from "react"
import { Alert, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteUploadFile } from "../../../store/file/actions";
import { tempFilesSelector, tempImagesSelector } from "../selectors";
import basic_styles from '../styles';
import imagesConfig from "../../../config/images-config";
export const ImageViewer = () => {
  const [isShowImageZoom, setShowImageZoom] = useState(false);
  const [selectedImages, setSelectedImages] = useState<any>([]);
  const tempSelectedImages = useSelector((tempFilesSelector));
  const dispatch = useDispatch();
  const onDeleteUploadFile = (file) => {
    dispatch(deleteUploadFile(file));
  }
  return (
    <View style={styles.view_container}>
      <CardItem header bordered>
        <Text>现场照片</Text>
      </CardItem>
      <CardItem >
        <Body>
          {
            tempSelectedImages && tempSelectedImages.length > 0 &&
            <FlatList
              horizontal={true}
              data={tempSelectedImages}
              renderItem={
                ({ item }) => {
                  const createContent = () => {
                    if (item.type && item.type.startsWith('image')) {
                      return <Image
                        source={{ uri: `data:${item.type};base64,${item.base64}` }}
                        style={styles.maintain_image}>
                      </Image>
                    } else if (item.name.endsWith('.mp4')) {
                      return <Video source={{ uri: item.uri }}
                        style={styles.backgroundVideo}
                        posterResizeMode='center'
                        resizeMode='contain'
                      />
                    } else {
                      return <Image
                        source={imagesConfig.report.other_file}
                        style={styles.maintain_image}>
                      </Image>
                    }
                  }
                  return <TouchableOpacity
                    onLongPress={
                      () => {
                        Alert.alert(
                          "提示",
                          "是否删除当前文件",
                          [
                            {
                              text: "取消",
                              style: "cancel"
                            },
                            { text: "确定", onPress: () => onDeleteUploadFile(item) }
                          ]
                        );
                      }
                    }
                    onPress={
                      () => {
                        if (item.type && item.type.startsWith('image')) {
                          setSelectedImages([
                            {
                              url: `data:${item.type};base64,${item.base64}`
                            }
                          ]);
                          setShowImageZoom(true);
                        }
                      }
                    }
                  >
                    <View style={styles.maintain_image_item}>
                      {
                        createContent()
                      }
                    </View>
                  </TouchableOpacity>
                }
              }
              keyExtractor={item => item.savedName}
            />
          }
          <Modal
            isVisible={isShowImageZoom}
            coverScreen={true}
            hasBackdrop={false}
          >
            <ImageZoomViewer
              enableSwipeDown={true}
              onSwipeDown={() => {
                setShowImageZoom(false)
              }}
              imageUrls={selectedImages} />
          </Modal>
        </Body>
      </CardItem>
    </View>
  )
}

const styles = StyleSheet.create({
  ...basic_styles,
  maintain_image_item: {
    marginLeft: 5,
  },
  maintain_image: {
    height: 120,
    width: 120,
    resizeMode: 'center'
  },
  backgroundVideo: {
    height: 120,
    width: 120,
  },
});


