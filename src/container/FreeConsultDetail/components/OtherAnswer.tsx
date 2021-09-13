import React, { memo, useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import Text from "components/Text";
import { Colors } from "configs";
import DoctorRate from "components/DoctorRate";
import ButtonIcon from "components/ButtonIcon";
import ButtonLinear from "components/Buttons/ButtonLinear";
import Theme from "style/Theme";
import { SOURCE_ICON } from "images";
import { width } from "configs/Const";
import ModalDoctorAgreed from "components/ModalDoctorAgreed";
import useModalAnimation from "hooks/useModalAnimation";

interface OtherAnswerProps {
  doctor: {
    name: string;
    faculty: string;
    rate: number;
    numberOfReviews: number;
    avatar: ImageSourcePropType;
  };
  image?: ImageSourcePropType;
  answer: string;
  numberAgreed: number;
  numberThanks: number;
  agreed: boolean;
}

const OtherAnswer = memo(
  ({
    doctor,
    image,
    answer,
    numberAgreed,
    numberThanks,
    agreed,
  }: OtherAnswerProps) => {
    const [itemAgreed, setItemAgreed] = useState(agreed);
    const { visible, open, close, transY } = useModalAnimation();
    const onShowDoctorAgreed = useCallback(() => {
      open();
    }, []);
    const onPressAgree = useCallback(() => {
      setItemAgreed((prev) => !prev);
    }, []);
    return (
      <View
        style={{
          borderRadius: 16,
          marginTop: 14,
          backgroundColor: Colors.White,
        }}
      >
        <View
          style={{
            padding: 16,
            borderBottomColor: Colors.WhiteSmoke,
            borderBottomWidth: 1,
          }}
        >
          <DoctorRate {...doctor} />
        </View>
        {image && <Image source={image} style={{ width: "100%" }} />}
        <View
          style={{
            padding: 16,
            borderBottomColor: Colors.WhiteSmoke,
            borderBottomWidth: 1,
          }}
        >
          <Text size={15} lineHeight={24}>
            {answer}
          </Text>
          <Text
            size={13}
            lineHeight={16}
            color={Colors.GrayBlue}
            marginTop={16}
          >
            {numberThanks} Thanks
          </Text>
          <View style={{ ...Theme.flexRowSpace, marginTop: 16 }}>
            <ButtonIcon
              icon={require("images/ic_option.png")}
              tintColor={Colors.GrayBlue}
              size={50}
              borderRadius={12}
              style={{
                borderWidth: 1,
                borderColor: Colors.Platinum,
              }}
            />
            {!itemAgreed ? (
              <ButtonLinear
                title="Agree"
                styleButton={{ flex: 1, marginLeft: 16 }}
                white
                style={{ marginTop: 0 }}
                colors={[Colors.TealBlue, Colors.TealBlue]}
                leftChildren={
                  <Image
                    source={require("images/ic_agree.png")}
                    style={{ width: 24, height: 24, marginRight: 8 }}
                  />
                }
                onPress={onPressAgree}
              />
            ) : (
              <ButtonLinear
                title="Agreed"
                styleButton={{ flex: 1, marginLeft: 16 }}
                style={{ marginTop: 0 }}
                white
                colors={[Colors.GrayBlue, Colors.GrayBlue]}
                onPress={onPressAgree}
                leftChildren={
                  <Image
                    source={require("images/ic_checkmark.png")}
                    style={{
                      width: 24,
                      height: 24,
                      marginRight: 8,
                      tintColor: Colors.White,
                    }}
                  />
                }
              />
            )}
          </View>
        </View>
        <TouchableOpacity
          style={{ padding: 16, ...Theme.flexRowSpace }}
          onPress={onShowDoctorAgreed}
          activeOpacity={0.54}
        >
          <View style={Theme.flexRow}>
            
            <Text size={13} lineHeight={16} color={Colors.GrayBlue}>
              {numberAgreed} doctors agree
            </Text>
          </View>
          <Image source={SOURCE_ICON.arrowRight} />
        </TouchableOpacity>
        <ModalDoctorAgreed {...{ visible, close, transY }} />
      </View>
    );
  }
);

export default OtherAnswer;

const styles = StyleSheet.create({
  container: {},
});
