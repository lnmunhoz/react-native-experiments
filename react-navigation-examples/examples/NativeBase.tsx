import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Button } from "react-native";
import { Fade } from "../components/Fade";
import { createStackNavigator } from "@react-navigation/stack";
import * as NB from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

export enum NativeBaseScreens {
  Loading = "NativeBase.Loading",
  Home = "NativeBase.Home",
  Notifications = "NativeBase.Notifications",
  Search = "NativeBase.Search"
}

const Stack = createStackNavigator();

export default function NativeBase() {
  return (
    <Stack.Navigator
      initialRouteName={NativeBaseScreens.Home}
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fcfcfc"
        }
      }}
    >
      <Stack.Screen name={NativeBaseScreens.Loading} component={Loading} />
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
          headerTitle: "Search"
        }}
      />
      <Stack.Screen
        name={NativeBaseScreens.Notifications}
        component={Search}
        options={{
          headerTitle: "Notifications"
        }}
      />
    </Stack.Navigator>
  );
}

function Loading() {
  const [isReady, setReady] = useState(false);
  useEffect(() => {
    Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    }).then(() => {
      setReady(true);
    });
  });

  return (
    isReady && (
      <View>
        <Text>Is ready!</Text>
      </View>
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
  return (
    <View style={styles.container}>
      <Text>Search Screen</Text>
    </View>
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
