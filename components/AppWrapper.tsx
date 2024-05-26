import { useEffect, type PropsWithChildren, type ReactElement } from "react";
import { StyleSheet, View } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { useMovieStore } from "@/store";
import HorizontalButtonScroll from "./HorizontalButtonScroll";

const HEADER_HEIGHT = 150;

type Props = PropsWithChildren<{
  headerImage?: ReactElement;
}>;

export default function AppWrapper({ children, headerImage }: Props) {
  const { categories, setCategory, fetchCategories } = useMovieStore();

  const handlePressButton = (id: string, value: boolean) => {
    setCategory(id, value);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header]}>
        <View>{headerImage}</View>
        <View style={styles.categorySection}>
          <HorizontalButtonScroll
            buttons={categories}
            handleChange={handlePressButton}
          />
        </View>
      </View>
      <View style={styles.content}>{children}</View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424",
    top: 0,
  },
  header: {
    height: 154,
    overflow: "hidden",
    position: "static",
  },
  content: {
    flex: 1,
    padding: 10,
    gap: 16,
    // overflow: "hidden",
    height: "100%",
  },
  categorySection: {
    position: "absolute",
    top: 100,
  },
});
