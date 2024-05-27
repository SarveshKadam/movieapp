import { useMovieStore } from "@/store";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Card from "./Card";

interface Movie {
  id: number;
  title: string;
  release_date: number;
  poster_path: string;
  // Add more properties as needed
}

interface Movies {
  [year: number | string]: Movie[];
}

const defaultYear = 2012;
const Movies = () => {
  const {
    movies,
    fetchMovies,
    oldestYear,
    newestYear,
    setOldestYear,
    setNewestYear,
  } = useMovieStore();
  useEffect(() => {
    fetchMovies(defaultYear);
  }, []);

  const handleEndReached = () => {
    fetchMovies(newestYear + 1);
    setNewestYear(newestYear + 1);
  };

  const handleRefresh = () => {
    fetchMovies(oldestYear - 1);
    setOldestYear(oldestYear - 1);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={Object.entries(movies)}
        renderItem={({ item }) => {
          return (
            <View>
              <Text style={styles.yearTitle}>{item[0]}</Text>
              <FlatList
                data={item[1]}
                columnWrapperStyle={{ columnGap: 20, margin: 10 }}
                contentContainerStyle={styles.cardContainer}
                numColumns={2}
                renderItem={({ item }) => {
                  return (
                    <Card
                      key={item.id}
                      title={item.title}
                      release_date={item.release_date}
                      imageUri={item.poster_path}
                    />
                  );
                }}
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
    paddingTop: 20,
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
