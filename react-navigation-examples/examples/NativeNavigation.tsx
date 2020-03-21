import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet, Text, View, Button } from "react-native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { Fade } from "../components/Fade";

const Stack = createNativeStackNavigator();

export default function NativeNavigation() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fcfcfc"
        }
      }}
    >
      <Stack.Screen
        name="NativeNavigation.Home"
        component={Home}
        options={{
          headerTitle: "Home",
          headerRight: () => (
            <Button
              title="Notifications"
              onPress={() => {
                navigation.navigate("NativeNavigation.Notifications");
              }}
            />
          )
        }}
      />
      <Stack.Screen
        name="NativeNavigation.Notifications"
        component={Notifications}
        options={{
          headerTitle: "Notifications"
        }}
      />
    </Stack.Navigator>
  );
}

function Home() {
  const navigation = useNavigation();

  navigation.setOptions({
    headerLargeTitle: true
  });

  return (
    <ScrollView>
      <Fade visible direction="down">
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
      </Fade>
    </ScrollView>
  );
}

function Notifications() {
  const navigation = useNavigation();

  navigation.setOptions({
    headerLargeTitle: false
  });

  return (
    <View style={styles.container}>
      <Text>Notifications</Text>
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
  }
});
