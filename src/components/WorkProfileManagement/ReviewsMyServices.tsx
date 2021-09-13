import React, { memo } from "react";
import { View, StyleSheet, Image } from "react-native";
import Text from "components/Text";
import { width } from "configs/Const";
import { Colors } from "configs";
import TabBar from "components/TabBar";
import AnimatedCircle from "./AnimatedCircle";
import Theme from "style/Theme";
import ReviewItem from "./ReviewItem";
import Container from "components/Layout/Container";

interface Props {
  content?: any;
  rating?: number;
  reviews?: number;
  review?: any;
}

const ReviewsMyServices = memo(
  ({ content, rating, reviews, review }: Props) => {
    const [tabActive, setTabActive] = React.useState<number>(0);

    return (
      <Container style={styles.container}>
        <TabBar
          onChangeTab={(index) => setTabActive(index)}
          style={styles.tabBar}
          tabs={["From Patients", "From Colleagues"]}
        />
        {tabActive === 0 && (
          <>
            <View style={styles.topView}>
              {content &&
                content.map((item: any, index: number) => {
                  return (
                    <AnimatedCircle key={index} startAnim={true} {...item} />
                  );
                })}
            </View>
            <Text marginTop={32} marginLeft={24} bold size={17} lineHeight={22}>
              Reviews
            </Text>
            <View style={styles.review}>
              <Image source={require("images/ic_star_rate.png")} />
              <Text size={13} lineHeight={16} semiBold marginHorizontal={4}>
                {rating}
              </Text>
              <Text size={13} lineHeight={16} color={Colors.GrayBlue}>
                ({reviews} reviews)
              </Text>
            </View>
            {review &&
              review.map((item: any, index: number) => {
                return (
                  <ReviewItem style={styles.reviewItem} key={index} {...item} />
                );
              })}
          </>
        )}
      </Container>
    );
  }
);

export default ReviewsMyServices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
  },
  tabBar: {
    marginTop: 24,
    marginHorizontal: 24,
    alignSelf: "center",
    position: "absolute",
  },
  topView: {
    ...Theme.flexRowSpace,
    marginTop: 104,
    marginHorizontal: 30,
    paddingBottom: 60,
    borderBottomWidth: 1,
    borderBottomColor: Colors.WhiteSmoke,
  },
  review: {
    marginTop: 8,
    marginLeft: 24,
    ...Theme.flexRow,
  },
  reviewItem: {
    marginTop: 32,
    marginHorizontal: 24,
  },
});
