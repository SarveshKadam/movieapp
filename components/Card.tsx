import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

const windowWidth = Dimensions.get("window").width;
const numColumns = windowWidth >= 540 ? 3 : 2;
const itemWidth = windowWidth / numColumns - 2 * 16
interface CardProps {
  title: string;
  release_date: string | number;
  imageUri: string;
}

const PREFIX = "https://image.tmdb.org/t/p/w500/";

const Card: React.FC<CardProps> = ({
  title,
  release_date,
  imageUri,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: PREFIX + imageUri }}
          resizeMode={"contain"}
        />
      </View>
      <View style={styles.overlay}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{release_date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: itemWidth,
    height: 250,
    backgroundColor: "white",
    marginVertical: 10,
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    flex: 1 / numColumns,
  },
  imageContainer: { display: "flex" },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    padding: 10,
  },
  title: {
    fontSize: 14,
    color: "white",
    fontWeight: 600,
    marginBottom: 5,
  },
  description: {
    fontSize: 10,
    color: "white",
    fontWeight: 600,
  },
});

export default Card;
