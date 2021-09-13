import React, { memo } from "react";
import {
  View,
  StyleSheet,
  Image,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import { Colors } from "configs";
import { SOURCE_ICON } from "images";

interface ReviewItemProps {
  style?: ViewStyle;
  avatar?: any;
  name?: string;
  rate?: number | string;
  date?: string;
  description?: string;
}

const ReviewItem = memo(
  ({ avatar, name, rate, date, description, style }: ReviewItemProps) => {
    return (
      <View style={[styles.container, style]}>
        <View style={[Theme.flexRowSpace, { alignItems: "flex-end" }]}>
          <View style={Theme.flexRow}>
            <Image style={styles.avatar} source={avatar} />
            <View>
              <Text marginBottom={8} bold size={13} lineHeight={16}>
                {name}
              </Text>
              <View style={Theme.flexRow}>
                <Image source={require("images/ic_star_rate.png")} />
                <Text size={13} lineHeight={16} semibold marginHorizontal={4}>
                  {rate}
                </Text>
              </View>
            </View>
          </View>
          <Text size={13} lineHeight={16} color={Colors.GrayBlue}>
            {date}
          </Text>
        </View>
        <Text size={13} lineHeight={22} marginTop={16}>
          {description}
        </Text>
        <View style={[Theme.flexRowSpace, { alignItems: "flex-end" }]}>
          <Text
            marginTop={12}
            size={13}
            lineHeight={16}
            color={Colors.GrayBlue}
          >
            Report
          </Text>
          <TouchableOpacity style={styles.viewLikeComment} activeOpacity={0.54}>
            <Image source={SOURCE_ICON.likeComment} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
);

export default ReviewItem;

const styles = StyleSheet.create({
  container: {},
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    marginRight: 16,
  },
  viewLikeComment: {
    width: 40,
    height: 40,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});
