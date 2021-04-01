import {  Button,  FooterTab, Icon, Text } from "native-base"
import React from "react"
import { Alert} from "react-native";
import { useDispatch } from "react-redux"; 
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { 
  requestUploadFile,
} from '../../../store/file/actions';
export const FooterForm = () => {
  const dispatch = useDispatch();

  const Image_Options = {
    mediaType: 'photo',
    quality: 0.5,
    maxHeight: 2000,
    maxWidth: 2000,
    saveToPhotos: false,
    includeBase64: true,
  };

  function selectImageFromLibrary() {
    launchImageLibrary(Image_Options, (response) => {

      if (response.didCancel) {
      } else if (response.errorCode) {
        Alert.alert('提示', response.errorCode);
      } else {

        dispatch(
          requestUploadFile({
            uri: response.uri!,
            type: response.type!,
            name: response.fileName!,
            base64: response.base64!,
            size: response.fileSize!,
          }),
        );
      }
    });
  }

  function takeImage() {
    launchCamera(Image_Options, (response) => {

      if (response.didCancel) {
      } else if (response.errorCode) {

        Alert.alert('提示', response.errorCode);
      } else {

        dispatch(
          requestUploadFile({
            uri: response.uri!,
            type: response.type!,
            name: response.fileName!,
            base64: response.base64!,
            size: response.fileSize!,
          }),
        );
      }
    });
  }

  function takeVideo() {
    const options = {
      mediaType: 'video',
      videoQuality: 'low',
      durationLimit: 30,
    };
    launchCamera(options, (response) => {

      if (response.didCancel) {
      } else if (response.errorCode) {

        Alert.alert('提示', response.errorCode);
      } else {

        dispatch(
          requestUploadFile({
            uri: response.uri!,
            type: response.type!,
            name: response.fileName!,
            base64: response.base64!,
            size: response.fileSize!,
          }),
        );
      }
    });
  }

  return (
    <FooterTab>
      <Button vertical onPress={selectImageFromLibrary}>
        <Icon name="images-outline" />
        <Text>相册</Text>
      </Button>
      <Button vertical>
        <Icon name="mic-outline" />
        <Text>录音</Text>
      </Button>
      <Button vertical onPress={takeVideo}>
        <Icon active name="videocam-outline" />
        <Text>视频</Text>
      </Button>
      <Button onPress={takeImage} vertical>
        <Icon name="camera-outline" />
        <Text>拍照</Text>
      </Button>
    </FooterTab>
  )
}



