import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator
} from "@react-navigation/stack";
import * as Font from "expo-font";
import * as NB from "native-base";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SearchBar } from "react-native-elements";
import { ShimmerPlaceHolder } from "../components/ShimmerPlaceholder";

export enum NativeBaseScreens {
  Loading = "NativeBase.Loading",
  Home = "NativeBase.Home",
  Notifications = "NativeBase.Notifications",
  Search = "NativeBase.Search"
}

const Stack = createStackNavigator();

export default function NativeBase() {
  const [isReady, setReady] = useState(false);
  useEffect(() => {
    if (Platform.OS === "android") {
      Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        ...Ionicons.font
      }).then(() => {
        setReady(true);
      });
    } else {
      setReady(true);
    }
  });

  return (
    isReady && (
      <Stack.Navigator
        initialRouteName={NativeBaseScreens.Home}
        screenOptions={{
          headerStyle: {
            backgroundColor: "#fcfcfc"
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
        mode="card"
      >
        <Stack.Screen
          name={NativeBaseScreens.Home}
          component={Home}
          options={({ navigation, route }) => ({
            headerTitle: "Native Base",
            headerRight: () => (
              <View style={{ flexDirection: "row" }}>
                <NB.Button
                  icon
                  transparent
                  style={{ marginRight: 10 }}
                  onPress={() => navigation.navigate(NativeBaseScreens.Search)}
                >
                  <NB.Icon
                    name="search"
                    style={{
                      fontSize: 28
                    }}
                  />
                </NB.Button>
              </View>
            )
          })}
        />
        <Stack.Screen
          name={NativeBaseScreens.Search}
          component={Search}
          options={{
            headerTitle: "Search",
            headerStyle: {
              borderBottomWidth: 0,
              borderTopWidth: 0,
              shadowOffset: {
                height: 0,
                width: 0
              }
            }
          }}
        />
        <Stack.Screen
          name={NativeBaseScreens.Notifications}
          component={Notifications}
          options={{
            headerTitle: "Notifications"
          }}
        />
      </Stack.Navigator>
    )
  );
}

function Home() {
  return (
    <ScrollView
      style={{
        padding: 20
      }}
      contentContainerStyle={{
        flex: 1
      }}
    >
      <View style={styles.buttonContainer}>
        <NB.Button>
          <NB.Text>Primary</NB.Text>
        </NB.Button>
      </View>
      <View style={styles.buttonContainer}>
        <NB.Button success>
          <NB.Text>Success</NB.Text>
        </NB.Button>
      </View>
    </ScrollView>
  );
}

function Notifications() {
  return (
    <View style={styles.container}>
      <Text>Notifications</Text>
    </View>
  );
}

function Search() {
  const [search, setSearch] = useState<string>();
  const [scrollY] = useState(new Animated.Value(0));
  const scrollView = useRef<ScrollView>();
  const searchBar = useRef<SearchBar>();
  const [layoutHeight, setLayoutHeight] = useState(0);

  const shadowOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 0.3],
    extrapolate: "clamp"
  });

  useFocusEffect(() => {
    searchBar.current?.focus();
  });

  const renderPlaceholder = () => {
    const rows = Math.round(layoutHeight / 30);
    const width = Dimensions.get("screen").width;
    return [...Array(rows).keys()].map(n => (
      <ShimmerPlaceHolder
        key={`shimmer-${n}`}
        autoRun
        visible={false}
        width={width}
        style={{
          width: "100%",
          marginBottom: 20
        }}
      />
    ));
  };

  useEffect(() => {});

  return (
    <>
      <Animated.View
        style={{
          shadowColor: "#000",
          zIndex: 1,
          shadowOffset: {
            width: 0,
            height: 1
          },
          shadowOpacity: shadowOpacity,
          shadowRadius: 3
        }}
      >
        <SearchBar
          ref={searchBar}
          placeholder="Type Here..."
          lightTheme
          value={search}
          onChangeText={text => setSearch(text)}
          onCancel={() => setSearch("")}
          containerStyle={{
            borderTopWidth: 0,
            backgroundColor: "white",
            paddingTop: 0
          }}
          inputContainerStyle={{
            backgroundColor: Platform.OS === "ios" ? "#e5e4ea" : "white",
            borderRadius: 10
          }}
        />
      </Animated.View>
      <ScrollView
        onLayout={event => {
          setLayoutHeight(event.nativeEvent.layout.height);
        }}
        ref={scrollView}
        keyboardDismissMode="on-drag"
        scrollEventThrottle={16}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } }
        ])}
        contentContainerStyle={{
          padding: 20
        }}
      >
        {renderPlaceholder()}
      </ScrollView>
    </>
  );
}

function ListItem() {
  return (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>List Item</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  listItem: {
    padding: 20,
    backgroundColor: "white",
    marginBottom: 20,
    justifyContent: "center",
    alignContent: "center"
  },
  listItemText: {
    fontSize: 28
  },
  buttonContainer: {
    marginBottom: 20
  }
});
