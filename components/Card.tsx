import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const numColumns = windowWidth >= 540 ? 3 : 2;
const itemWidth = windowWidth / numColumns - 2 * 16;
interface CardProps {
  title: string;
  vote_average: number;
  imageUri: string;
}

const PREFIX = "https://image.tmdb.org/t/p/w500/";

const Card: React.FC<CardProps> = ({ title, vote_average, imageUri }) => {
  return (
    <View style={styles.card}>
      <ImageBackground style={styles.image} source={{ uri: PREFIX + imageUri }}>
        <View style={styles.overlay}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.ratings}>⭐ {vote_average?.toFixed(1)}</Text>
        </View>
      </ImageBackground>
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
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    flex: 1 / numColumns,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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
  ratings: {
    fontSize: 12,
    color: "white",
    fontWeight: 600,
  },
});

export default Card;
