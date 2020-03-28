import React from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text
} from "react-native";
import Constants from "expo-constants";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item"
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item"
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item"
  }
];

// @ts-ignore I didn't bother for types here. This is just a POC.
const Item = React.memo(({ id, title, selected, onSelect }) => {
  console.log("render Item", id);
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        styles.item,
        { backgroundColor: selected ? "#6e3b6e" : "#f9c2ff" }
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
});

export default function App() {
  const [selected, setSelected] = React.useState([]);

  /**
   * Vanilla immutable approach
   */
  const onSelect = React.useCallback(id => {
    setSelected(current => {
      const isAdded = current.indexOf(id) !== -1;
      if (isAdded) {
        return current.filter(c => c !== id);
      } else {
        return [...current, id];
      }
    });
  }, []);

  function renderItem({ item }) {
    return (
      <Item
        id={item.id}
        title={item.title}
        selected={!!selected.find(id => id === item.id)}
        onSelect={onSelect}
      />
    );
  }

  /**
   * Set immutable appraoch.
   * Using Set also works, just a different approach
   */
  // const [selected, setSelected] = React.useState(new Set());
  // const onSelect = React.useCallback(id => {
  //   console.log("onSelect");
  //   setSelected(selected => {
  //     if (selected.has(id)) {
  //       selected.delete(id);
  //       return new Set(selected.values());
  //     } else {
  //       selected.add(id);
  //       return new Set(selected.values());
  //     }
  //   });
  // }, []);

  // function renderItem({ item }) {
  //   return (
  //     <Item
  //       id={item.id}
  //       title={item.title}
  //       selected={selected.has(item.id)}
  //       onSelect={onSelect}
  //     />
  //   );
  // }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selected}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  }
});
