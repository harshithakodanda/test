import React, { memo } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Text from "components/Text";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "configs";
import Theme from "style/Theme";
import { SOURCE_ICON } from "images";

interface TopicMoreProps {}

const TopicMore = memo(({}: TopicMoreProps) => {
  return (
    <TouchableOpacity
      style={{ borderRadius: 16, backgroundColor: Colors.White }}
      activeOpacity={0.54}
    >
      <View>
        <Image
          source={require("images/down.png")}
          style={{ width: "100%" }}
        />
        <LinearGradient
          colors={["transparent", "#1d1e1f60"]}
          style={styles.linear}
        />
        <Text
          size={17}
          lineHeight={20}
          bold
          color={Colors.White}
          style={{ position: "absolute", left: 16, bottom: 16, zIndex: 11 }}
        >
          Flu
        </Text>
      </View>
      <View style={{ padding: 16 }}>
        <Text size={13} lineHeight={20}>
          Influenza (also known as “flu”) is a contagious respiratory illness
          caused by influenza viruses. It can cause mild to severe illness…
        </Text>
      </View>
      <TouchableOpacity
        style={{
          padding: 12,
          ...Theme.center,
          borderTopColor: Colors.WhiteSmoke,
          borderTopWidth: 1,
          ...Theme.flexDirection,
        }}
      >
        <Text size={13} lineHeight={22} color={Colors.DodgerBlue}>
          Read More
        </Text>
        <Image
          source={SOURCE_ICON.arrowRight}
          style={{ width: 16, height: 16, marginLeft: 4 }}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
});

export default TopicMore;

const styles = StyleSheet.create({
  container: {},
  linear: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
});
