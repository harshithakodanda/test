import React, { memo } from "react";
import { View, StyleSheet, Modal, TouchableOpacity } from "react-native";
import Text from "components/Text";
import Animated from "react-native-reanimated";
import ModalSlideBottom from "components/ModalSlideBottom";
import Theme from "style/Theme";
import { Colors } from "configs";
import DoctorRate from "components/DoctorRate";
import { getBottomSpace } from "react-native-iphone-x-helper";

interface ModalDoctorAgreedProps {
  visible: boolean;
  transY: Animated.Node<number>;
  close: () => void;
}

const ModalDoctorAgreed = memo(
  ({ visible, transY, close }: ModalDoctorAgreedProps) => {
    return (
      <Modal
        visible={visible}
        onRequestClose={close}
        transparent
        animationType={"none"}
      >
        <ModalSlideBottom transY={transY} onClose={close}>
          <View style={{ paddingBottom: getBottomSpace() + 12 }}>
            <View
              style={{
                ...Theme.flexRow,
                paddingTop: 10,
                paddingBottom: 24,
                paddingHorizontal: 24,
                borderBottomWidth: 1,
                borderBottomColor: Colors.WhiteSmoke,
              }}
            >
              <Text size={17} lineHeight={20} bold>
                Doctors agree
              </Text>
              <Text
                size={15}
                lineHeight={18}
                color={Colors.GrayBlue}
                marginTop={2}
                marginLeft={4}
              >
                125
              </Text>
            </View>
            {dataDoctorAgreed.map((item) => (
              <TouchableOpacity
                key={item.id.toString()}
                style={{
                  padding: 24,
                  borderBottomColor: Colors.WhiteSmoke,
                  borderBottomWidth: 1,
                }}
                activeOpacity={0.54}
              >
                <DoctorRate {...item} />
              </TouchableOpacity>
            ))}
          </View>
        </ModalSlideBottom>
      </Modal>
    );
  }
);

export default ModalDoctorAgreed;

const styles = StyleSheet.create({
  container: {},
});

const dataDoctorAgreed = [
  {
    id: 0,
    name: "Florence Porter",
    faculty: "Pediatrics",
    rate: 4.5,
    numberOfReviews: 1387,
    avatar: require("images/avatar/sarah.png"),

    online: true,
  },
  
];
