import React, { useState } from 'react'
import { View, Text, CameraRoll } from 'react-native'
import QRCode from 'react-native-qrcode-svg';
import {
  Platform,
  PermissionsAndroid,
  ToastAndroid,
  Button
}
  from 'react-native';
import RNFS from "react-native-fs";


const NativeQrGenerator = () => {
  const [item, setItem] = useState({
    data: 'upi://pay?pa=govindbiswas079-2@okaxis&pn=Govinda%20Biswas&aid=uGICAgICDyJGZHg',
  });
  const [productQRref, setProductQRref] = useState();

  const saveQrToDisk = async (item) => {

    if (Platform.OS === "android" &&
      !(await hasAndroidPermission())) {
      return;
    }

    if (productQRref) {

      productQRref.toDataURL((data) => {
        console.log(data)

        let filePath = RNFS.DownloadDirectoryPath + `/prem.png`;
        RNFS.writeFile(filePath, data, 'base64')
          .then((success) => {
            console.log(success)
            // return CameraRoll.save(filePath, 'photo')
          })
          .then(() => {
            ToastAndroid.show('QRCode saved to gallery', ToastAndroid.LONG);
          });
      });
    }
  }

  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission =
      await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' }}>
      <QRCode
        size={350}
        color="black"
        backgroundColor="white"
        value={item?.data}
        logo={{
          url:
            'https://resourcesfordesigner.com/wp-content/uploads/2019/08/lottie.jpg',
        }}
        logoSize={30}
        logoMargin={2}
        logoBorderRadius={15}
        logoBackgroundColor="transparent"
        getRef={(c) => setProductQRref(c)} />



      <Button onPress={() => saveQrToDisk()} title='saveQrToDisk' />
    </View>
  )
}

export default NativeQrGenerator