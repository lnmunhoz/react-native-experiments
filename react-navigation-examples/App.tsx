import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { enableScreens } from "react-native-screens";
import NativeNavigation from "./examples/NativeNavigation";

const Stack = createStackNavigator();

enableScreens();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="NativeNavigation" component={NativeNavigation} />
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
        onPress={() => navigation.navigate("NativeNavigation")}
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
