import { createContext, useContext, useState } from "react";
import { LatLng } from "react-native-maps";
import { ICreator } from "./types";

interface INewPlace {
  creator: { name: string; profilePhoto: string; email: string };
  placeImages: [string, string, string];
  coordinate: LatLng;
  description?: string;
}

interface IAppContext {
  newPlace: INewPlace;
  setCreator: ({ name, profilePhoto, email }: ICreator) => void;
  setCoordinate: (coord: LatLng) => void;
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
    setNewPlace({
      ...newPlace,
      creator: {
        name,
        profilePhoto,
        email,
      },
    });
  };

  const setCoordinate = ({ latitude, longitude }: LatLng) => {
    setNewPlace({
      ...newPlace,
      coordinate: {
        latitude: latitude,
        longitude: longitude,
      },
    });
  };

  const values = {
    newPlace,
    setCreator,
    setCoordinate,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
