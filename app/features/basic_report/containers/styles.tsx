import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedData: {
    margin: 24,
    padding: 12,
    backgroundColor: "rgba(200,200,0,0.15)",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.75)",
  },
  col: {
    alignItems: "center",
    paddingHorizontal: 1,
  },
  row: {
    paddingBottom: 5,
    paddingTop: 5,
  },
  maintain_image: {
    height: 120,
    width: 120,
  },
  record_item: {
    marginTop: 5,
  },
});
export default styles;
