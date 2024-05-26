import { Image, StyleSheet } from "react-native";

import AppWrapper from "@/components/AppWrapper";
import Movies from "@/components/Movies";

export default function HomeScreen() {
  return (
    <AppWrapper
      headerImage={
        <Image
          source={require("@/assets/images/app-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      {/* <ResponsiveCardContainer>
        {data.map((item) => (
          <Card
            title={`Title1 ${item}`}
            imageUri="https://image.tmdb.org/t/p/w500/hkxxMIGaiCTmrEArK7J56JTKUlB.jpg"
            description={`Description ${item}`}
            key={item}
          />
        ))}
      </ResponsiveCardContainer> */}
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
