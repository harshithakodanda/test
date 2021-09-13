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
  description?: string;
  video: string; 
  urlPath: string;
  onPress?: () => void;
}

const TrendingTopicItem = memo(
  ({ imagePath, name,description, video, urlPath, onPress }: TrendingTopicItemProps) => { //add onPress 
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
        <Text semiBold size={15} marginHorizontal={15} >
         {name}
         </Text> 
        <Line />
          <Image source={{uri:imagePath}} style={styles.image} />
          <View></View>
          <Text style={{textAlign:"justify"}} size={14} marginHorizontal={15} >
         {description}
         </Text> 
        </View>
      </TouchableOpacity>
    );
  }
);

export default TrendingTopicItem;

const styles = StyleSheet.create({
  container: {
    width: (width - 48) ,
    borderRadius: 16,
    marginRight: 12,
    ...Theme.shadow,
    marginBottom: 16,
    paddingVertical:15,
  },
  image: {
    width: (width - 48),
    height: ((width - 48) * 1 * 120) / 224,
    borderRadius: 8,// add changes
    marginVertical:10,
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
