import React, { memo } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Text from "components/Text";
import LinearColors from "components/LinearColors";
import Theme from "style/Theme";
import { Colors, Routes } from "configs";
import { SOURCE_ICON } from "images";
import Layout from "components/Layout/Layout";

interface MedicationMenuProps {}

const MedicationMenu = memo(({}: MedicationMenuProps) => {
  return (
    <Layout style={styles.content}>
      {menuData.map((item, index) => (
        <TouchableOpacity
          key={item.id.toString()}
          style={[
            styles.controlItem,
            index !== menuData.length - 1 && styles.border,
          ]}
          onPress={() => {}}
        >
          <View style={Theme.flexRow}>
            <LinearColors
              colors={[Colors.TealBlue, Colors.TurquoiseBlue]}
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                ...Theme.center,
                marginRight: 16,
              }}
            >
              <Image source={item.icon} style={{ tintColor: Colors.White }} />
            </LinearColors>
            <Text size={15} lineHeight={18}>
              {item.name}
            </Text>
          </View>
          <Image source={SOURCE_ICON.arrowRight} />
        </TouchableOpacity>
      ))}
    </Layout>
  );
});

export default MedicationMenu;

const styles = StyleSheet.create({
  container: {},
  content: {
    marginTop: 40,
    borderRadius: 16,
    paddingVertical: 8,
    ...Theme.shadow,
  },
  controlItem: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    ...Theme.flexRowSpace,
  },
  border: {
    borderBottomColor: Colors.WhiteSmoke,
    borderBottomWidth: 1,
  },
});

const menuData = [
  {
    id: 0,
    name: "Overview",
    icon: SOURCE_ICON.additionalInformation,
  },
  {
    id: 1,
    name: "Uses for",
    icon: SOURCE_ICON.accountNormal,
  },
  {
    id: 2,
    name: "Side Effect",
    icon: SOURCE_ICON.sideEffect,
  },
  {
    id: 3,
    name: "Health Guide",
    icon: SOURCE_ICON.healthGuide,
  },
];
