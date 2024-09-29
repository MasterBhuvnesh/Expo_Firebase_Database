import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Fetch from "./Fetch";
import { useFonts } from "expo-font";
export default function App() {
  const [loaded, error] = useFonts({
    Poppins: require("./assets/font/Poppins-Regular.ttf"),
    PoppinsSemi: require("./assets/font/Poppins-SemiBold.ttf"),
    PoppinsBold: require("./assets/font/Poppins-Bold.ttf"),
  });
  useEffect(() => {
    if (loaded || error) {
      console.log("Loading");
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Fetch />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    fontFamily: "Poppins",
  },
});
