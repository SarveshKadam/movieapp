import axios from "axios";
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

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&vote_count.gte=100`;
const defaultYear = 2012;
const Movies = () => {
  const [movies, setMovies] = useState<Movies>({});
  const [loading, setLoading] = useState(false);
  const [oldestYear, setOldestYear] = useState(2012);
  const [newestYear, setNewestYear] = useState(2012);

  useEffect(() => {
    fetchData(defaultYear);
  }, []);

  const fetchData = async (year: any) => {
    // setLoading(true);
    console.log("year", year);
    try {
      const response = await axios.get(
        `${BASE_URL}&primary_release_year=${year}`
      );
      const data = await response.data;
      setMovies({ ...movies, [year]: data?.results });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    // setLoading(false);
  };

  const handleEndReached = () => {
    // You can implement your logic here for handling end reached
    console.log("new", newestYear);
    fetchData(newestYear + 1);
    setNewestYear((prev) => prev + 1);
    console.log("End reached");
  };

  const handleRefresh = () => {
    // You can implement your logic here for handling refresh
    fetchData(oldestYear - 1);
    setOldestYear((prev) => prev - 1);
    console.log("Refreshed");
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
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
          refreshing={loading}
          onRefresh={handleRefresh}
        />
      )}
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
    // padding: 20,
    // margin: 20,
    // flex: 1,
    //gap: 10,
  },
});

export default Movies;
