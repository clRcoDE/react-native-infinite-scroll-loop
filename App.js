import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import InfiniteScroll from "./infiniteLoop";
import {mockData} from './mockData'





export default class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <View style={styles.container}>
        <InfiniteScroll
          data={mockData}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={[styles.text, { color: "black" }]}>
                {item.value}
              </Text>
            </View>
          )}
          offset={100}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333"
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    margin: 8,
    borderWidth: 2,
    backgroundColor: "#FEFEFE",
    borderRadius: 100
  },
  text: {
    fontSize: 32,
    fontWeight: "bold"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
