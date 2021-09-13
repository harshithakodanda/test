import React, { memo, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  Platform,
} from "react-native";
import Theme from "style/Theme";
import Text from "components/Text";

import { Colors } from "configs";
import { useFocusEffect } from "@react-navigation/native";
import keyExtractor from "utils/keyExtractor";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import { NEW_CONSULTS_DATA } from "configs/Data";
import ButtonIconHeader from "components/ButtonIconHeader";
import { width } from "configs/Const";
import Container from "components/Layout/Container";
import YoutubePlayer from "react-native-youtube-iframe";
import Layout from "components/Layout/Layout";

export default memo(({ route }: any) => {
  const { imagePath, name, description, link, source,urlPath } =
    route && route.params;
    const videoSplit = urlPath.split('/')
    const videoId = videoSplit[videoSplit.length-1]
  const [relatedQuestions, setRelatedQuestions] = React.useState<any>([]);

//   useEffect(()=>{console.log( route.params)},[])

  useFocusEffect(
    React.useCallback(() => {
      setRelatedQuestions(NEW_CONSULTS_DATA);
    }, [])
  );

  
  const listHeaderComponent = React.useCallback(() => {
    return (
      <Container>
        <View style={styles.image}>
          <YoutubePlayer height={200} play={true} videoId={videoId} />
        </View>
        <Layout style={styles.box}>
          
          <Text style={{fontSize:24,fontWeight:"bolder",marginBottom:15}}>{name}</Text>
          <Text style={{fontSize:15,fontWeight:"bolder",marginBottom:15}}>{description}</Text>
          <Text style={{fontSize:13,fontWeight:"bolder",marginBottom:15}}>Source - {source}</Text>
         </Layout>
       
      </Container>
    );
  }, []);

  const renderItem = ()=>{
    return(
      <View></View>
    )
  };

  return (
    <Container style={styles.container}>
      <FlatList
        data={relatedQuestions}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        bounces={false}
        ListHeaderComponent={listHeaderComponent}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={keyExtractor}
      />
      <View style={styles.header}>
        <ButtonIconHeader/>
        <View style={Theme.flexRow}>
        <Image
        source={require("images/smallLogo.png")}
       style={{height:40,width:40, margin:10}}
      />
        </View>
      </View>
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  image: {
    width: "100%",
   // borderWidth:1,
  //  height: 320,
    marginTop: 100,
  },
  box: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    marginHorizontal: 24,
    borderRadius: 16,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: Colors.boxShadow,
    shadowOpacity: 1,
    marginTop: 28,
    marginBottom: 10,
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: Colors.TealBlue,
    ...Theme.center,
    borderRadius: 16,
    marginRight: 16,
  },
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
 
  header: {
    paddingTop: Platform.OS === "ios" ? getStatusBarHeight() + 22 : 22,
    paddingBottom: 16,
    paddingHorizontal: 24,
    ...Theme.flexRowSpace,
    position: "absolute",
    width: width,
    marginBottom:20,
  },
});
