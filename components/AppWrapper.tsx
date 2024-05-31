import { useEffect, type PropsWithChildren, type ReactElement } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HorizontalButtonScroll from "./HorizontalButtonScroll";
import { useMovieStore } from "@/store";

type Props = PropsWithChildren<{
  headerImage?: ReactElement;
}>;

export default function AppWrapper({ children }: Props) {
  const {
    categories,
    setCategory,
    fetchCategories,
    searchText,
    setSearchText,
  } = useMovieStore();

  const handlePressButton = (id: string, value: boolean) => {
    setCategory(id, value);
  };

  const clearSearchText = () => {
    setSearchText("");
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.header]}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
          />
          {!!searchText?.length && (
            <TouchableOpacity
              onPress={clearSearchText}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle-outline" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.categorySection}>
          <HorizontalButtonScroll
            buttons={categories}
            handleChange={handlePressButton}
          />
        </View>
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424",
    top: 0,
  },
  header: {
    height: 124,
    overflow: "hidden",
    position: "static",
  },
  content: {
    flex: 1,
    padding: 10,
    gap: 16,
    height: "100%",
  },
  categorySection: {
    position: "absolute",
    top: 60,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 40,
    marginLeft: 5,
    marginRight: 5,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    color: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    height: '100%',
  },
  clearButton: {
    padding: 5,
  },
});
