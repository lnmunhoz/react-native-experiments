import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { Button, Text, View } from "react-native";

const Stack = createStackNavigator();

function Home() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function Notifications() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Notifications Screen</Text>
    </View>
  );
}

export default function ReactNavigation() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ReactNavigation.Home"
        component={Home}
        options={{
          headerTitle: "Home",
          headerRight: () => (
            <Button
              title="Notifications"
              onPress={() =>
                navigation.navigate("ReactNavigation.Notifications")
              }
            />
          )
        }}
      />
      <Stack.Screen
        name="ReactNavigation.Notifications"
        component={Notifications}
        options={({ route }) => ({
          headerTitle: "Notifications"
        })}
      />
    </Stack.Navigator>
  );
}
