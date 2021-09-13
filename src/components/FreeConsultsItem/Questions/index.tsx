import React , {useState, memo, useEffect} from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity, Text as DefaultText } from 'react-native';
import { normalize } from "configs/services/size"; // add 
import { Colors } from "configs";
import Layout from "components/Layout/Layout";
import Text from "components/Text";
import Theme from "style/Theme";
import { DefaultTheme } from '@react-navigation/native';
const { width } = Dimensions.get("window");

export interface Props {
  question?: any;
  index?: any;
  submit?:boolean;
  submitFalse?: () => void;
  setValue?: () => any;
}

const Questions = memo(({question, index , submit, setValue,submitFalse}:Props) => {
  const [option1, setOption1] = useState(false);
  const [option2, setOption2] = useState(false);
  const [option3, setOption3] = useState(false);
  const [option4, setOption4] = useState(false);
  return (
    <Layout style={styles.box}>

<Text 
          style={{
            fontSize: normalize(17),
            textAlign: "left",
            marginLeft: 5,
            // margin: 5,
          }}
        >
            {"Q"} 
          {index + 1}
          {") "}
          {question.question}
        </Text>
        <TouchableOpacity>
          <TouchableOpacity
            style={{
              borderColor:(!option1 && !option2 && !option3 && !option4 && submit) ?"red":Colors.Isabelline,
              width: width * 0.80,
              height: 53,
              borderWidth: 1,
              backgroundColor: option1 ? Colors.TealBlue : null,
              borderRadius: 5,
              alignItems: "flex-start",
              margin:5
            }}
            onPress={() =>{
              const value= question.answers[0].text
              const id = question.id
              const correct = question.answers[0].correct
              {setValue(id, value, correct)}
              // {handleClick(value)}
              if(!(option1 && option2 && option3)){submitFalse}
                setOption1(true)
                setOption2(false)
                setOption3(false)
                setOption4(false)
            }}
          >
            <Text
              style={{
                fontSize: normalize(16),
                textAlign: "left",
                marginLeft: 8,
                // marginTop:-6,
                paddingVertical:14,
              }}
            >
              {question.answers[0].text}
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity>
          <TouchableOpacity
            style={{
              borderColor:(!option1 && !option2 && !option3 && !option4 && submit) ?"red":Colors.Isabelline,
              width: width * 0.80,
              height: 53,
              borderWidth: 1,
              backgroundColor: option2 ? Colors.TealBlue : null,
              borderRadius: 5,
              alignItems: "flex-start",
              margin:5
            }}
            onPress={() =>{
              const value= question.answers[1].text
              const id = question.id
              const correct = question.answers[1].correct
              {setValue(id, value, correct)}
              // {handleClick(value)}
              if(!(option1 && option2 && option3)){submitFalse}
              setOption1(false)
              setOption2(true)
              setOption3(false)
              setOption4(false)
            }}
          >
            <Text
              style={{
                fontSize: normalize(16),
                textAlign: "left",
                marginLeft: 10,
                // marginTop:-6,
                paddingVertical:14,
              }}
            >
              {question.answers[1].text}
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity>
          <TouchableOpacity
            style={{
              borderColor:(!option1 && !option2 && !option3  && !option4 && submit) ?"red":Colors.Isabelline,
              width: width * 0.80,
              height: 53,
              borderWidth: 1,
              backgroundColor: option3 ? Colors.TealBlue :null,
              borderRadius: 5,
              alignItems: "flex-start",
              margin:5
            }}
            onPress={(e) =>{
              const value= question.answers[2].text
              const id =question.id
              const correct = question.answers[2].correct
              {setValue(id, value, correct)}
              // {handleClick(value)}
              if(!(option1 && option2 && option3)){submitFalse}
            setOption1(false)
            setOption2(false)
            setOption3(true)
            setOption4(false)
            }}
          >
            <Text
              style={{
                fontSize: normalize(16),
                textAlign: "left",
                marginLeft: 10,
                // marginTop:-6,
                paddingVertical:14,
              }}
            >
              {question.answers[2].text}
            </Text>
          </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity>
          <TouchableOpacity
            style={{
              borderColor:(!option1 && !option2 && !option3 && !option4 && submit) ?"red":Colors.Isabelline,
              width: width * 0.80,
              height: 53,
              borderWidth: 1,
              backgroundColor: option4 ? Colors.TealBlue : null,
              borderRadius: 5,
              alignItems: "flex-start",
              margin:5
            }}
            onPress={() =>{
              const value= question.answers[3].text;
              const id = question.id;
              const correct = question.answers[3].correct
              {setValue(id, value, correct)}
              // {handleClick(value)}
              if(!(option1 && option2 && option3)){submitFalse}
            setOption4(true)
            setOption1(false)
            setOption2(false)
            setOption3(false)
            }}
          >
            <Text
              style={{
                fontSize: normalize(16),
                textAlign: "left",
                marginLeft: 10,
                // marginTop:-6,
                paddingVertical:14,
              }}
            >
              {question.answers[3].text}
            </Text>
          </TouchableOpacity>
          </TouchableOpacity>
    
    </Layout>
    
  );
});

export default Questions; 

const styles = StyleSheet.create({  
  box: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginHorizontal: -1,
    borderRadius: 16,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 15 },
    shadowColor: Colors.boxShadow,
    shadowOpacity: 1,
    marginBottom:20
    
  },
});
