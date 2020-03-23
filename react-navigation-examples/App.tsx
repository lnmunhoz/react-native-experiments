import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import NativeBase, { NativeBaseScreens } from "./examples/NativeBase";
import NativeNavigation from "./examples/NativeNavigation";
import ReactNavigation from "./examples/ReactNavigation";

enableScreens();

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen
            name="NativeNavigation.Home"
            component={NativeNavigation}
          />
          <Stack.Screen
            name="ReactNavigation.Home"
            component={ReactNavigation}
          />
          <Stack.Screen name={NativeBaseScreens.Home} component={NativeBase} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
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
      <Button
        title="Native Base"
        onPress={() => navigation.navigate(NativeBaseScreens.Home)}
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
