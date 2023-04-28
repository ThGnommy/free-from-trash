import { createContext, useContext, useState } from "react";
import { LatLng } from "react-native-maps";
import { ICreator, ICreatorInfo } from "./types";

export interface INewPlace {
  creatorUID: string;
  placeImages: [string, string, string];
  coordinate: LatLng;
  previewMapImage: string;
  street: string;
  city: string;
  userJoined: string[];
  creatorInfo: ICreatorInfo;
  id?: string;
  description?: string;
}

interface IAppContext {
  newPlace: INewPlace;
  placeList: INewPlace[] | null;
  setCreatorUID: (uid: string) => void;
  setCoordinate: (coord: LatLng) => void;
  setNewImages: (imagesArray: [string, string, string]) => void;
  setPreviewMapImage: (image: string) => void;
  setNewDescription: (text: string) => void;
  setSingleNewImages: (idx: number, previewImage: string) => void;
  setNewStreet: (street: string, city: string) => void;
  removeSelectedImage: (idx: number) => void;
  updatePlaceList: (list: INewPlace[]) => void;
  resetNewPlace: () => void;
  userProvince: string;
  updateUserProvince: (prov: string) => void;
}

const defaultState: INewPlace = {
  creatorUID: "",
  placeImages: ["", "", ""],
  coordinate: {
    latitude: 0,
    longitude: 0,
  } as LatLng,
  previewMapImage: "",
  street: "",
  city: "",
  id: "",
  creatorInfo: {
    name: "",
    photoURL: "",
  },
  userJoined: [],
  description: "",
};

const AppContext = createContext<IAppContext>({} as IAppContext);

export function useApp() {
  return useContext(AppContext);
}

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [placeList, setPlaceList] = useState<INewPlace[] | null>(null);

  // Handle Place List functions

  const updatePlaceList = (list: INewPlace[]) => {
    setPlaceList(list);
  };

  const [newPlace, setNewPlace] = useState<INewPlace>(
    defaultState as INewPlace
  );

  // Handle new place functions

  const setCreatorUID = (uid: string) => {
    const updatedPlace = Object.assign(newPlace, {
      creatorUID: uid,
    });

    setNewPlace(updatedPlace);
  };

  const setCoordinate = ({ latitude, longitude }: LatLng) => {
    const updatedPlace = Object.assign(newPlace, {
      coordinate: {
        latitude: latitude,
        longitude: longitude,
      },
    });

    setNewPlace(updatedPlace);
  };

  const setPreviewMapImage = (image: string) => {
    const updatedPlace = Object.assign(newPlace, {
      previewMapImage: image,
    });

    setNewPlace(updatedPlace);
  };

  const setNewImages = (imagesArray: [string, string, string]) => {
    const updatedPlace = Object.assign(newPlace, {
      placeImages: imagesArray,
    });

    setNewPlace(updatedPlace);
  };

  const setSingleNewImages = (idx: number, previewImage: string) => {
    const newArray: [string, string, string] = [...newPlace.placeImages];

    newArray.splice(idx, 1, previewImage);

    setNewPlace({
      ...newPlace,
      placeImages: newArray,
    });
  };

  const removeSelectedImage = (idx: number) => {
    const newArray: [string, string, string] = [...newPlace.placeImages];

    newArray.splice(idx, 1, "");

    setNewPlace({
      ...newPlace,
      placeImages: newArray,
    });
  };

  const setNewStreet = (street: string, city: string) => {
    const updatedPlace = Object.assign(newPlace, {
      street,
      city,
    });

    setNewPlace(updatedPlace);
  };

  const setNewDescription = (text: string) => {
    setNewPlace({
      ...newPlace,
      description: text,
    });
  };

  const resetNewPlace = () => {
    setNewPlace(defaultState);
  };

  const [userProvince, setUserProvince] = useState<string>("");

  const updateUserProvince = (province: string) => {
    setUserProvince(province);
  };

  const values = {
    newPlace,
    setCreatorUID,
    setCoordinate,
    setNewImages,
    setPreviewMapImage,
    setSingleNewImages,
    setNewDescription,
    setNewStreet,
    removeSelectedImage,
    placeList,
    updatePlaceList,
    resetNewPlace,
    userProvince,
    updateUserProvince,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
