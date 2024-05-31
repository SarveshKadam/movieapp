
import { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Card from "./Card";
import { getFilteredMovies } from "@/constants/helpers";
import { useMovieStore } from "@/store";

const defaultYear = 2012;
const Movies = () => {
  const {
    movies,
    fetchMovies,
    oldestYear,
    newestYear,
    setOldestYear,
    setNewestYear,
    searchText = "",
  } = useMovieStore();
  const { width } = useWindowDimensions();

  const handleEndReached = () => {
    fetchMovies(newestYear + 1);
    setNewestYear(newestYear + 1);
  };

  const handleRefresh = () => {
    fetchMovies(oldestYear - 1);
    setOldestYear(oldestYear - 1);
  };

  useEffect(() => {
    fetchMovies(defaultYear);
  }, []);
  const filteredMovies = getFilteredMovies(searchText, movies);
  return (
    <View style={styles.container}>
      <FlatList
        data={Object.entries(filteredMovies)}
        renderItem={({ item }) => {
          const numColumns = width >= 540 ? 3 : 2;
          return (
            <View>
              <Text style={styles.yearTitle}>{item[0]}</Text>
              <FlatList
                data={item[1]}
                columnWrapperStyle={{ columnGap: 20, margin: 10 }}
                contentContainerStyle={styles.cardContainer}
                numColumns={numColumns}
                renderItem={({ item }) => {
                  return (
                    <Card
                      key={item.id}
                      title={item.title}
                      vote_average={item.vote_average}
                      imageUri={item.poster_path}
                    />
                  );
                }}
                key={width >= 540 ? "h" : "v"}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
          );
        }}
        keyExtractor={(item) => item[0]}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.01}
        refreshing={false}
        onRefresh={handleRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  yearSection: {
    marginBottom: 20,
  },
  yearTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 10,
    color: "white",
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Movies;
