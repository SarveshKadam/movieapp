import { Image, StyleSheet } from "react-native";

import AppWrapper from "@/components/AppWrapper";
import Movies from "@/components/Movies";

export default function HomeScreen() {
  return (
    <AppWrapper>
      <Movies />
    </AppWrapper>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    top: 40,
    left: 18,
    position: "absolute",
  },
});
