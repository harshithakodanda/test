import React, {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import Text from "components/Text";
import ButtonIcon from "components/ButtonIcon";
import ButtonLinear from "components/Buttons/ButtonLinear";
import Theme from "style/Theme";
import scale from "utils/scale";
import { Colors } from "configs";
import NumberAnswered from "components/NumberAnswered";
import { useTheme } from "configs/Theme";

interface WriteAnswerProps {
  myAnswer: string;
  setMyAnswer: Dispatch<SetStateAction<string>>;
  onAnswer: () => void;
}

const WriteAnswer = memo(
  ({ myAnswer, setMyAnswer, onAnswer }: WriteAnswerProps) => {
    const { theme } = useTheme();
    const inputRef: any = useRef();
    const onFocusInput = useCallback(() => {
      inputRef.current.focus();
    }, []);
    return (
      <View>
        <View
          style={{
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            backgroundColor: Colors.White,
            marginBottom: 16,
          }}
        >
          <View style={{ height: 4, backgroundColor: Colors.TealBlue }} />
          <View
            style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}
          >
            <Text marginBottom={8} size={13} lineHeight={16}>
              A member asked:
            </Text>
            <Text size={17} lineHeight={25} bold>
              Please provide some do's and don'ts for people who are sick with
              the flu or a cold.
            </Text>
            <NumberAnswered numberOfAnswers={12} />
          </View>
        </View>
        <View
          style={{
            padding: 16,
            backgroundColor: Colors.White,
            borderRadius: 16,
          }}
        >
          <TouchableOpacity
            style={{
              borderRadius: 8,
              backgroundColor: theme.background,
              height: scale(160),
              borderWidth: 1,
              borderColor: Colors.Isabelline,
              padding: 16,
            }}
            onPress={onFocusInput}
            activeOpacity={0.54}
          >
            <TextInput
              ref={inputRef}
              value={myAnswer}
              placeholder={"Write an answer…"}
              style={{
                fontSize: 15,
                lineHeight: 18,
              }}
              onChangeText={setMyAnswer}
              multiline={true}
            />
          </TouchableOpacity>
          <View style={{ ...Theme.flexRowSpace, marginTop: 16 }}>
            <ButtonIcon
              icon={require("images/ic_photo_library.png")}
              size={50}
              borderRadius={12}
              style={{
                borderWidth: 1,
                borderColor: Colors.Platinum,
              }}
            />
            <ButtonLinear
              title="Send Answer"
              styleButton={{ flex: 1, marginLeft: 16 }}
              style={{ marginTop: 0 }}
              colors={[Colors.TealBlue, Colors.TealBlue]}
              onPress={onAnswer}
              disabled={myAnswer.length === 0}
              white
            />
          </View>
        </View>
      </View>
    );
  }
);

export default WriteAnswer;

const styles = StyleSheet.create({
  container: {},
});
