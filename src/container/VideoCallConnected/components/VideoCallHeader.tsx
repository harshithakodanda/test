import React, { memo, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import { Colors, Routes } from "configs";
import { useNavigation } from "@react-navigation/native";

interface VideoCallHeaderProps {}

const VideoCallHeader = memo(({}: VideoCallHeaderProps) => {
  const { navigate } = useNavigation();
  const onEndCall = useCallback(() => {
    navigate(Routes.EndCall);
  }, []);
  return (
    <View
      style={{
        ...Theme.flexDirection,
        paddingTop: 24,
        paddingHorizontal: 24,
        paddingBottom: 16,
      }}
    >
      <Image source={require("images/ic_sound.png")} />
      <View style={{ marginLeft: 8, flex: 1 }}>
        <Text>Inez Byrd</Text>
        <Text>29:12 remaining (30 mins visit)</Text>
      </View>
      <TouchableOpacity
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          backgroundColor: Colors.RedNeonFuchsia,
          ...Theme.center,
        }}
        onPress={onEndCall}
      >
        <Image source={require("images/ic_call_off.png")} style={Theme.icons} />
      </TouchableOpacity>
    </View>
  );
});

export default VideoCallHeader;

const styles = StyleSheet.create({
  container: {},
});
