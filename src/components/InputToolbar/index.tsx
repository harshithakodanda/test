import React, { memo, useState, useCallback, useRef } from "react";
import { View, TextInput, Platform, ViewStyle, StyleSheet } from "react-native";
import ButtonIcon from "components/Buttons/ButtonIcon";
import { useKeyboardShowTranslation } from "hooks/useKeyboardShowTranslation";
import Animated from "react-native-reanimated";

interface Props {
  style?: ViewStyle | object;
  inputToolBarStyle?: ViewStyle | object;
  placeholder?: string;
  linearButton?: boolean;
  onScrollToEnd: () => void;
  onSendMessage: (text: string) => void;
  onShare: () => void;
  onSendFile: () => void;
  onFocusInput?: () => void;
  onBlur?: () => void;
}

export default memo(
  ({
    style,
    onSendMessage,
    onShare,
    onSendFile,
    onScrollToEnd,
    placeholder,
    inputToolBarStyle,
    onFocusInput,
    onBlur,
  }: Props) => {
    const [chatContent, setContent] = useState("");
    const inputRef = useRef<any>();
    const { animatedStyle } = useKeyboardShowTranslation();

    const _onSendMessage = useCallback(() => {
      onSendMessage && onSendMessage(chatContent);
      inputRef.current.clear();
    }, [chatContent, onSendMessage]);

    const _onFocusInput = useCallback(() => {
      onScrollToEnd && onScrollToEnd();
      onFocusInput && onFocusInput();
    }, []);

    return (
      <Animated.View style={[styles.container, animatedStyle, style && style]}>
        <ButtonIcon icon={"share"} onPress={onShare} />
        <ButtonIcon
          style={styles.buttonAttack}
          icon={"attack"}
          onPress={onSendFile}
        />
        <View style={[styles.inputToolBarStyle, inputToolBarStyle]}>
          <TextInput
            ref={inputRef}
            placeholder={placeholder ? placeholder : ""}
            style={styles.textInput}
            value={chatContent}
            onChangeText={setContent}
            onFocus={_onFocusInput}
          />
        </View>
        <ButtonIcon
          style={styles.buttonSend}
          icon={"send"}
          onPress={_onSendMessage}
        />
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  inputToolBarStyle: {
    backgroundColor: "rgba(240, 240, 240, 0.68)",
    borderRadius: 8,
    paddingHorizontal: 20,
    height: 38,
    flex: 1,
    ...Platform.select({
      ios: {
        paddingVertical: 12,
      },
    }),
  },
  textInput: {
    fontSize: 16,
  },
  buttonAttack: {
    marginHorizontal: 16,
  },
  buttonSend: {
    marginLeft: 16,
  },
});
