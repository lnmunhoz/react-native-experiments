import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet, Text, View, Button } from "react-native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";

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
        name="Home"
        component={Home}
        options={{
          headerRight: () => (
            <Button
              title="Notifications"
              onPress={() => {
                navigation.navigate("Notifications");
              }}
            />
          )
        }}
      />
      <Stack.Screen name="Notifications" component={Notifications} />
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
