import Geolocation, { GeoPosition } from 'react-native-geolocation-service';

const config = { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 };

 

const getCurrentLatLong = async () => {  
  const getCurrentPosition = () =>
    new Promise<GeoPosition>((resolve, error) =>
      Geolocation.getCurrentPosition(resolve, error, config),
    );

  try {
    const Data: GeoPosition = await getCurrentPosition();
    const Latlong = `${Data?.coords?.latitude}, ${Data?.coords?.longitude}`;

    return { Status: true, Data, Latlong };
  } catch (error) {
    console.log('getCurrentLatLong::catcherror =>', error);
    return { Status: false, Message: error.code };
  }
};
