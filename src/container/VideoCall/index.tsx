import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Text from "components/Text";
import { Colors, Routes } from "configs";
import Theme from "style/Theme";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import scale from "utils/scale";
import ButtonLinear from "components/Buttons/ButtonLinear";
import Container from "components/Layout/Container";

interface VideoCallProps {}

const VideoCall = memo((props: VideoCallProps) => {
  const route: any = useRoute();
  const { user } = route.params;
  const { navigate } = useNavigation();
  const [isCalling, setCalling] = useState(true);
  const onMute = useCallback(() => {}, []);
  const onCancelCall = useCallback(() => {
    setCalling(false);
  }, []);
  const onLiveChat = useCallback(() => {}, []);
  const onReport = useCallback(() => {
    navigate(Routes.CallReportProblem);
  }, [navigate]);

  const timeout: any = useRef(null);

  useEffect(() => {
    if (isCalling) {
      clearTimeout(timeout);
      setTimeout(() => {
        navigate(Routes.VideoCallConnected);
      }, 3000);
    }
  }, [isCalling]);

  return (
    <Container style={styles.container}>
      <View
        style={{
          ...Theme.flexOne,
          ...Theme.center,
        }}
      >
        <View
          style={{
            width: 320,
            height: 320,
            alignSelf: "center",
            ...Theme.center,
          }}
        >
          <Text
            size={20}
            lineHeight={24}
            center
            bold
            style={{ position: "absolute", bottom: 28 }}
          >
            {user.name}
          </Text>
          {!isCalling && (
            <ButtonLinear
              styleButton={{ position: "absolute", bottom: -62 }}
              style={{ marginTop: 0, paddingHorizontal: 32 }}
              title="Report Call Problem"
              onPress={onReport}
            />
          )}
          <Text
            size={15}
            lineHeight={24}
            center
            style={{ position: "absolute", top: -24 }}
          >
            Outgoing Call…
          </Text>
          <View style={Theme.shadow}>
            <Image
              source={user.img}
              style={{
                width: 120,
                height: 120,
                borderWidth: 4,
                borderColor: Colors.White,
                borderRadius: 28,
                zIndex: 100,
              }}
            />
          </View>
          {isCalling && (
            <>
              <View
                style={{
                  width: 160,
                  height: 160,
                  position: "absolute",
                  backgroundColor: Colors.RedNeonFuchsia,
                  zIndex: -10,
                  borderRadius: 40,
                  opacity: 0.4,
                }}
              />
              <View
                style={{
                  width: 224,
                  height: 224,
                  position: "absolute",
                  backgroundColor: Colors.RedNeonFuchsia,
                  zIndex: -20,
                  borderRadius: 60,
                  opacity: 0.16,
                }}
              />
              <View
                style={{
                  width: 320,
                  height: 320,
                  position: "absolute",
                  backgroundColor: Colors.RedNeonFuchsia,
                  zIndex: -30,
                  borderRadius: 80,
                  opacity: 0.04,
                }}
              />
            </>
          )}
        </View>
      </View>
      <View
        style={{
          height: 52,
          marginBottom: getBottomSpace() + scale(68),
          ...Theme.flexRowSpace,
          paddingHorizontal: 40,
        }}
      >
        {isCalling && (
          <>
            <TouchableOpacity
              style={{
                width: 52,
                height: 52,
                borderRadius: 20,
                backgroundColor: Colors.Platinum,
                ...Theme.center,
              }}
              onPress={onMute}
            >
              <Image
                source={require("images/ic_mute.png")}
                style={Theme.icons32}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 52,
                height: 52,
                borderRadius: 20,
                backgroundColor: Colors.RedNeonFuchsia,
                ...Theme.center,
              }}
              onPress={onCancelCall}
            >
              <Image
                source={require("images/ic_cancel_phone.png")}
                style={Theme.icons32}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 52,
                height: 52,
                borderRadius: 20,
                backgroundColor: Colors.Malachite,
                ...Theme.center,
              }}
              onPress={onLiveChat}
            >
              <Image
                source={require("images/ic_live_chat.png")}
                style={Theme.icons32}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    </Container>
  );
});

export default VideoCall;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
