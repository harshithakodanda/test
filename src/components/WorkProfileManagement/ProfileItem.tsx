import React, { memo } from "react";
import { View, StyleSheet, Image } from "react-native";
import Text from "components/Text";
import { Colors } from "configs";
import ButtonIcon from "components/Buttons/ButtonIcon";
import { SOURCE_ICON } from "images";
import Theme from "style/Theme";
import Layout from "components/Layout/Layout";
import Line from "components/Layout/Line";

interface ProfileItemProps {
  icon?: string;
  title?: string;
  children?: any;
  verifyRequired?: any;
}

const ProfileItem = memo(
  ({ icon, title, children, verifyRequired }: ProfileItemProps) => {
    return (
      <Layout style={styles.container}>
        <View style={styles.topBox}>
          <View style={Theme.flexRow}>
            <View style={styles.rounded}>
              <Image style={styles.icon} source={SOURCE_ICON[`${icon}`]} />
            </View>
            <Text marginLeft={16} size={15} lineHeight={18} bold>
              {title}
            </Text>
          </View>
          <View style={styles.itemView}>
            <ButtonIcon style={styles.buttonEdit} icon={"pencil"} />
            {verifyRequired && (
              <Text size={9} lineHeight={14} color={Colors.GrayBlue}>
                Verify required
              </Text>
            )}
          </View>
        </View>
        <Line />
        {children}
      </Layout>
    );
  }
);

export default ProfileItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    paddingBottom: 24,
    marginHorizontal: 16,
    marginTop: 24,
  },
  buttonEdit: {
    width: 24,
    height: 24,
    backgroundColor: Colors.DodgerBlue,
  },
  topBox: {
    ...Theme.flexRowSpace,
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  rounded: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.OysterBay,
    ...Theme.center,
  },
  icon: {
    tintColor: Colors.TiffanyBlue,
  },
  itemView: {
    alignItems: "flex-end",
  },
});
