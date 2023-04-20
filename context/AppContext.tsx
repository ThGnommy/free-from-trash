import { createContext, useContext, useState } from "react";
import { LatLng } from "react-native-maps";
import { ICreator } from "./types";

interface INewPlace {
  creator: { name: string; profilePhoto: string; email: string };
  placeImages: [string, string, string];
  coordinate: LatLng;
  previewMapImage: string;
  description?: string;
}

interface IAppContext {
  newPlace: INewPlace;
  setCreator: ({ name, profilePhoto, email }: ICreator) => void;
  setCoordinate: (coord: LatLng) => void;
  setNewImages: (imagesArray: [string, string, string]) => void;
  setPreviewMapImage: (image: string) => void;
  setNewDescription: (text: string) => void;
  setSingleNewImages: (idx: number, previewImage: string) => void;
  removeSelectedImage: (idx: number) => void;
}

const defaultState = {
  creator: {
    name: "",
    profilePhoto: "",
    email: "",
  },
  placeImages: ["", "", ""],
  coordinate: {
    latitude: 0,
    longitude: 0,
  } as LatLng,
  previewMapImage: "",
  description: "",
};

const AppContext = createContext<IAppContext>({} as IAppContext);

export function useApp() {
  return useContext(AppContext);
}

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [newPlace, setNewPlace] = useState<INewPlace>(
    defaultState as INewPlace
  );

  const setCreator = ({ name, profilePhoto, email }: ICreator) => {
    const updatedPlace = Object.assign(newPlace, {
      creator: {
        name,
        profilePhoto,
        email,
      },
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

  const setNewDescription = (text: string) => {
    const updatedPlace = Object.assign(newPlace, {
      description: text,
    });

    setNewPlace(updatedPlace);
  };

  const values = {
    newPlace,
    setCreator,
    setCoordinate,
    setNewImages,
    setPreviewMapImage,
    setSingleNewImages,
    setNewDescription,
    removeSelectedImage,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
