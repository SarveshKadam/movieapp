import React from "react";
import { StyleSheet, ScrollView } from "react-native";

const ResponsiveCardContainer = ({ children }: any) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>{children}</ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
});

export default ResponsiveCardContainer;
