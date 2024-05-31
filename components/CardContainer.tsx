import { ReactNode } from "react";
import { StyleSheet, ScrollView } from "react-native";

interface ResponsiveCardContainerProps {
  children: ReactNode;
}

const ResponsiveCardContainer = ({ children }: ResponsiveCardContainerProps) => {
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
