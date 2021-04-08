import { StyleSheet } from "react-native";

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
  maintain_image_container: {

    marginTop: 5,

  },
  maintain_image_item: {
    marginLeft: 5,
  },
  maintain_image: {
    height: 120,
    width: 120,
    resizeMode: 'center'
  },
  record_item: {
    marginTop: 5,
    margin: 0,
    flex: 0,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 1.0,
    marginVertical: 1,
    borderRadius: 2,
    marginHorizontal: 1,
    padding: 0,
    borderWidth: 0,
  },
  
  
});
export default styles;
