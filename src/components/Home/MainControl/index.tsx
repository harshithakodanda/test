import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import Theme from "style/Theme";
import { Routes } from "configs";
import FeatureItem from "components/FeatureItem";
import { useTheme } from "configs/Theme";

const mainFeature = [
  {
    img: require("images/Home/img_schedule.png"),
    title: "Goal 1",
    route: Routes.Schedule,
  },
  {
    img: require("images/Home/img_consult_history.png"),
    title: "Goal 2",
   route: Routes.Consult,
  }
];

const MainControl = memo(() => {
  const { theme } = useTheme();
  return (
    
    <View style={styles.container}>
    
      {mainFeature.map((item) => (
        <FeatureItem
          {...item}
          key={item.title}
          style={{ backgroundColor: theme.backgroundItem }}
        />
      ))}
    </View>
  );
});

export default MainControl;

const styles = StyleSheet.create({
  container: {
    ...Theme.flexDirection,
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 45,
  },
});
