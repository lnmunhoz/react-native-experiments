import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Main screen</Text>
      <Button
        title="Open Modal"
        onPress={() => props.navigation.navigate("Modal")}
      />
    </View>
  );
}

function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text>Modal Screen</Text>
    </View>
  );
}

const MainStack = createStackNavigator({
  Home: {
    screen: HomeScreen
  }
});

const ModalStack = createStackNavigator({
  Modal: {
    screen: ModalScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: () => (
        <Button title="Close" onPress={() => navigation.navigate("Main")} />
      )
    })
  }
});

const RootStack = createStackNavigator(
  {
    Main: MainStack,
    Popup: ModalStack
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(RootStack);

export default function App() {
  return <AppContainer />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
