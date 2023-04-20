import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { LatLng } from "react-native-maps";
const useUserLocation = () => {
  const initialLocation = {
    latitude: 0,
    longitude: 0,
  };

  const [location, setLocation] = useState<LatLng>(initialLocation);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getLastKnownPositionAsync();

    setLocation({
      latitude: location!.coords.latitude!,
      longitude: location!.coords.longitude!,
    });
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return { location, errorMsg };
};

export default useUserLocation;
