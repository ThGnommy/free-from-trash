import { LatLng } from "react-native-maps";

const access_token =
  "pk.eyJ1IjoiZ25vbW15cyIsImEiOiJja2pia3o3ankxc2JvMnRtdHI4NDhrNmE4In0.T4KHPCPOwNwUAvbxdGqBPw";

export const mapPreviewLocation = ({ latitude, longitude }: LatLng) => {
  return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-s-l+000(${longitude},${latitude})/${longitude},${latitude},14/500x300?access_token=${access_token}`;
};
