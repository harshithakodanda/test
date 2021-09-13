import React, { memo,useState } from "react";
import {
  View,
  StyleSheet,
  ImageSourcePropType,
  TouchableOpacity,
  Image,
} from "react-native";
import Text from "components/Text";
import { width } from "configs/Const";
import { Colors } from "configs";
import Theme from "style/Theme";
import { useTheme } from "configs/Theme";
import YoutubePlayer from "react-native-youtube-iframe"; //add changes
import Line from "components/Layout/Line";

interface TrendingTopicItemProps {
  imagePath: string;
  name?: string;
  video: string; 
  urlPath: string;
  onPress?: () => void;
}

const TrendingTopicItem = memo(
  ({ imagePath, name, video, urlPath, onPress }: TrendingTopicItemProps) => { //add onPress 
    const { theme } = useTheme();
    const [videoPlay, setVideoPlay] = useState(false);
    return (
      <TouchableOpacity
        activeOpacity={0.54}
        //add changes 
        onPress={onPress}
        style={[styles.container, { backgroundColor: theme.backgroundItem }]}
      >
        
        <View>
       
          <Image source={{uri:imagePath}} style={styles.image} />
          
        </View>
      </TouchableOpacity>
    );
  }
);

export default TrendingTopicItem;

const styles = StyleSheet.create({
  container: {
    width: (width - 48) ,
    borderRadius: 0,
    marginRight: 12,
    ...Theme.shadow,
    marginBottom: 16,
    borderTopEndRadius:16,
  },
  image: {
    width: (width - 48),
    height: ((width ) * 0.75 * 120) / 189,
    borderRadius: 8,// add changes
  },
  title: {
    position: "absolute",
    bottom: 12,
    left: 12,
    zIndex: 11,
  },
  linear: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  }, titleView: {
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 12,
  },

});
