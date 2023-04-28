import { SaveFormat, manipulateAsync } from "expo-image-manipulator";

export const compressImage = async (url: string) => {
  const compressedImage = await manipulateAsync(url, [], {
    compress: 0.5,
    format: SaveFormat.PNG,
  });
  console.log(compressImage);
  return compressedImage.uri;
};

export const containAStringElement = (array: string[]) =>
  array.some((element) => typeof element === "string");
