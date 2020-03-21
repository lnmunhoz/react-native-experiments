import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { enableScreens } from "react-native-screens";
import NativeNavigation from "./examples/NativeNavigation";
import ReactNavigation from "./examples/ReactNavigation";

enableScreens();

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen
          name="NativeNavigation.Home"
          component={NativeNavigation}
        />
        <Stack.Screen name="ReactNavigation.Home" component={ReactNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Main() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Button
        title="Native Navigation"
        onPress={() => navigation.navigate("NativeNavigation.Home")}
      />
      <Button
        title="React Navigation"
        onPress={() => navigation.navigate("ReactNavigation.Home")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
