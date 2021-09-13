import React, { useCallback, Dispatch, SetStateAction, useRef } from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Text from "components/Text";
import { Colors, Constants } from "configs";
import Theme from "style/Theme";
import fillNumberLength from "utils/convert/fillNumberLength";
import { themes, useTheme } from "configs/Theme";
interface InputCodeOtpProps {
  style?: ViewStyle;
  autoFocus?: boolean;
  codeLength?: number;
  code: number;
  setCode: Dispatch<SetStateAction<string>>;
  showMessage: boolean;
  setShowMessage: Dispatch<SetStateAction<boolean>>;
}

const InputCodeOtp = ({
  style,
  codeLength = 5,
  code,
  autoFocus,
  setCode,
  showMessage,
  setShowMessage
}: InputCodeOtpProps) => {
  const { theme } = useTheme();
  const _code = fillNumberLength(code, codeLength);
  const inputRef: any = useRef();
  const renderInputBox = useCallback(() => {
    let arrBox = [];
    for (let i = 0; i < _code.length; i++) {
      arrBox.push(
        <TouchableOpacity onPress={onPressInput} key={i}>
        <View
          key={i.toString()}
          style={[
            styles.box,
            { borderColor: theme.activeTincolor },
            i !== codeLength - 1 && styles.space,
            _code.charAt(i) !== "#" && styles.alreadyEnter,
          ]}
        >
          {_code.charAt(i) !== "#" && (
            <Text size={32} semibold center lineHeight={40}>
              {_code.charAt(i)}
            </Text>
          )}
        </View>
        </TouchableOpacity>
      );
    }
    return arrBox;
  }, [_code]);

  const onPressInput = useCallback(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const onChangeText = useCallback(
    (text: string) => {
      let _text = text;
      if (text.length > codeLength) {
        _text = text.substring(0, codeLength);
      }
      setCode(_text);
      setShowMessage(false)
    },
    [codeLength]
  );

  
  return (
    <View style={[styles.container, style]}>
      {renderInputBox()}
      {code.length === codeLength && (
        <Image
          source={require("images/ic_accept.png")}
          style={styles.iconAccept}
        />
      )}
      <TextInput
        autoFocus={autoFocus}
        value={code}
        onChangeText={onChangeText}
        style={styles.fakeInput}
        ref={inputRef}
        keyboardType="phone-pad"
      />
    </View>
  );
};

export default InputCodeOtp;

const styles = StyleSheet.create({
  container: {
    ...Theme.flexRow,
    alignSelf: "center",
  },
  box: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    ...Theme.center,
  },
  space: {
    marginRight: 8,
  },
  iconAccept: {
    position: "absolute",
    right: -32,
    width: 24,
    height: 24,
  },
  fakeInput: {
    position: "absolute",
    right: -Constants.width * 2,
  },
  alreadyEnter: {
    borderColor: Colors.Malachite,
  },
});
