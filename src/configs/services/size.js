import { Dimensions,Platform, PixelRatio,StatusBar } from "react-native";


export const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  } = Dimensions.get('window');
  const screenHeight = Dimensions.get('screen').height;
  const windowHeight = Dimensions.get('window').height;
export  const navbarHeight = screenHeight - windowHeight + StatusBar.currentHeight;

  // based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
    const newSize = size * scale 
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
  }