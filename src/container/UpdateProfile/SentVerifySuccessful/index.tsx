import React, { memo, useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Image,Dimensions, ScrollView, ActivityIndicator } from "react-native";
import Text from "components/Text";
import Theme from "style/Theme";
import scale from "utils/scale";
import { Colors, Routes } from "configs";
import ButtonLinear from "components/Buttons/ButtonLinear";
import { useNavigation } from "@react-navigation/native";
import Container from "components/Layout/Container";
import YoutubePlayer from "react-native-youtube-iframe";
interface SentVerifySuccessfulProps {}
const { width } = Dimensions.get("window");
const SentVerifySuccessful = memo((props: SentVerifySuccessfulProps) => {
  const { navigate } = useNavigation();
  const [loading,setLoading] = useState(true)

  const onGoToDashBoard = useCallback(() => {
    navigate(Routes.MainTab);
  }, [navigate]);

  const onGoToAssesment = useCallback(() => {
    navigate(Routes.FinancialAssessmentStack);
  }, [navigate]);

  useEffect(()=>{
setTimeout(()=>{
  setLoading(false)
},2000)
  },[])

  return (
    <Container style={styles.container}>
       <ScrollView>
       <Image source={require("images/loginLogo.png")} style={styles.logo} />
      
      <Text size={20} lineHeight={24} bold center marginTop={25}>
        Welcome to MFW Family
        
      </Text>
      <View style={styles.image}>
         {!loading && <YoutubePlayer height={200} play={true} 
           videoId={"Z2iuuLkAirc"}
           onChangeState={event => console.log(event)}
           onReady={() => console.log("ready")}
           onError={e => console.log(e)}
           onPlaybackQualityChange={q => console.log(q)}
           volume={50}
           playbackRate={1}
           initialPlayerParams={{
             cc_lang_pref: "us",
             showClosedCaptions: true
           }} />}
           {loading && <ActivityIndicator  color="#006ee6"/>}
        </View>
      
      <ButtonLinear
        white
        title={"Go to Home Dashboard"}
        style={{ paddingHorizontal: 32 }}
        onPress={onGoToDashBoard}
        styleButton={{ marginTop: 24 }}
      />
      <ButtonLinear
        white
        title={"Take Financial Wellness Assessment"}
        style={{ paddingHorizontal: 32 }}
        onPress={onGoToAssesment}
        styleButton={{ marginTop: 24 }}
      />
      </ScrollView>
    </Container>
  );
});

export default SentVerifySuccessful;

const styles = StyleSheet.create({
  container: {
    ...Theme.container,
    ...Theme.center,
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 20,
  },
  logo: {
    // marginBottom: 12,
    // marginLeft: 12,
    width: width/2,
    height: (width/5),
  
  },
});
