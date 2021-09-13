import React, { memo, useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import Theme from "style/Theme";
import Text from "components/Text";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AVATAR } from "images/avatar";
import { getData } from "storage/store";
import { Icon } from "react-native-elements";
import { HeaderBackButton } from "@react-navigation/stack";
interface GreetingProps {}


const Greeting = memo((props: GreetingProps) => {
  const [name, setName] = useState("");
  const [businessname, setBusinessname] = useState("");
  useEffect(() =>{
    getData("userProfileData").then(user=>setName(user.firstName));
    getData("userOrganizationProfileData").then((org) =>setBusinessname(org.businessName));
  }, [])
  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "space-between", height: 10 }}>
        <Text size={17} lineHeight={20} bold>
          {name}
        </Text>
        <Text size={15} lineHeight={18}>
          {businessname}
        </Text>
      </View>
    </View>
  );
});

export default Greeting;

const styles = StyleSheet.create({
  container: {
    ...Theme.flexRow,
  },
});
function STORAGE_KEY(STORAGE_KEY: any) {
  throw new Error("Function not implemented.");
}

