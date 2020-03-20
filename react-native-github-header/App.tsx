/**
 * https://medium.com/dailyjs/how-i-linked-animated-headers-to-scroll-position-in-react-native-1a4906fca25b
 */

import React, { useRef, useState } from "react";
import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeArea
} from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

const HEADER_MAX_HEIGHT = 150;
const HEADER_MIN_HEIGHT = 75;
const HEADER_ANIMATION_RANGE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const HEADER_TITLE_MAX_SIZE = 46;
const HEADER_TITLE_MIN_SIZE = 18;
const LIST_ITEM_HEIGHT = 100;

function Main() {
  const insets = useSafeArea();
  const [scrollY] = useState(new Animated.Value(0));
  const scrollView = useRef<ScrollView>();
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp"
  });

  const titleSize = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_TITLE_MAX_SIZE, HEADER_TITLE_MIN_SIZE],
    extrapolate: "clamp"
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          backgroundColor: "#eef0f4",
          height: headerHeight,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          borderBottomWidth: 1,
          borderBottomColor: "rgba(0, 0, 0, 0.1)"
        }}
      >
        <Animated.Text
          style={{
            color: "black",
            fontSize: titleSize,
            position: "absolute",
            bottom: 0,
            paddingHorizontal: 20,
            paddingVertical: 10,
            width: "100%"
          }}
        >
          Home
        </Animated.Text>
      </Animated.View>
      <SafeAreaView>
        <View>
          <ScrollView
            ref={scrollView}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={15}
            onScrollEndDrag={event => {
              // @ts-ignore
              const value = scrollY._value;

              if (0 < value && value < HEADER_ANIMATION_RANGE / 2) {
                scrollView.current.scrollTo({ y: 0 });
              } else if (
                HEADER_ANIMATION_RANGE / 2 <= value &&
                value < HEADER_ANIMATION_RANGE
              ) {
                scrollView.current.scrollTo({ y: HEADER_ANIMATION_RANGE });
              }
            }}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: scrollY } } }
            ])}
            contentContainerStyle={{
              alignItems: "center",
              paddingTop: HEADER_MAX_HEIGHT - insets.top / 2,
              paddingBottom: insets.bottom,
              backgroundColor: "#cfcfcf",
              padding: 20,
              flexGrow: 1
            }}
          >
            <Text>ScrollView</Text>
            <ListItem text="First" />
            <ListItem text="Middle" />
            <ListItem text="Middle" />
            <ListItem text="Middle" />
            <ListItem text="Middle" />
            <ListItem text="Middle" />
            <ListItem text="Middle" />
            <ListItem text="Middle" />
            <ListItem text="Middle" />
            <ListItem text="Middle" />
            <ListItem text="Middle" />
            <ListItem text="Middle" />
            <ListItem text="Middle" />
            <ListItem text="Last" />
            <Text>ScrollView</Text>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Main />
    </SafeAreaProvider>
  );
}

interface ListItemProps {
  text: string;
}

const ListItem = (props: ListItemProps) => (
  <View
    style={{
      height: LIST_ITEM_HEIGHT,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "aqua",
      borderRadius: 5,
      marginBottom: 20,
      width: 250
    }}
  >
    <Text style={{ fontSize: 32 }}>{props.text}</Text>
  </View>
);
