import { Stack } from "expo-router";
import { Image, StyleSheet } from "react-native";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#242424",
        },
        headerLeft: () => (
          <Image style={styles.logo} source={require("@/assets/images/app-logo.png")} />
        ),
        headerTitle: "",
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="index" options={{}} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  logo: {
    paddingLeft: "10%",
  },
});