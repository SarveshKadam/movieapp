import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  buttons: { name: string; id: string; isSelected?: boolean }[];
  handleChange: (id: string, isSelected: boolean) => void;
}

const HorizontalButtonScroll = ({ buttons = [], handleChange }: Props) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {buttons?.map(({ name, id, isSelected }) => (
        <TouchableOpacity
          key={id}
          style={[styles.button, isSelected ? styles.selected : undefined]}
          role="button"
          onPress={(event) => {
            event.persist();
            handleChange(id, !isSelected);
          }}
        >
          <Text style={styles.buttonText}>{name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#484848",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "#F5F5F5",
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 20,
  },
  selected: {
    backgroundColor: "#F0283C",
  },
});

export default HorizontalButtonScroll;
