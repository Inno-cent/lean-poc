import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/AntDesign';

export default function ConfirmationPage() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.arrowButton}
      >
        <Icon name="arrowleft" size={24} color="#1B263B" />
      </TouchableOpacity>

      <View style={styles.mainContent}>
        <Image
          source={require("../../assets/images/congrats-check.png")}
          style={styles.image}
          resizeMode="cover"
        />

        <Text style={styles.headText}>
          Congratulations! Your Account is Now Active!
        </Text>
        <Text style={styles.descriptionText}>
          Your account with Onbrela is now active! You're all set to start
          exploring and enjoying all the features we offer
        </Text>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.checkoutButtonText}>Go To Homepage</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Aligns all content at the top
    paddingHorizontal: 20,
    paddingTop: 40, // Optional, to add some space from the top
  },
  arrowButton: {
    position: "absolute",
    top: 40,
    left: 10,
    padding: 10,
  },
  arrow: {
    fontSize: 24,
  },
  mainContent: {
    marginTop: 120, // Space from the arrow button
    alignItems: "center", // Center content horizontally
  },
  image: {
    marginBottom: 20,
  },
  headText: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },
  descriptionText: {
    fontSize: 16,
    color: "#1B263BE5",
    marginBottom: 100,
    textAlign: "center",
    fontWeight: "400",
  },
  checkoutButton: {
    padding: 12,
    backgroundColor: "#415a77",
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  checkoutButtonText: {
    fontSize: 15,
    color: "#fff",
  },
  skipText: {
    marginTop: 10,
    color: "#778DA9",
    fontWeight: "400",
    fontSize: 16,
    textDecorationLine: "underline",
    textAlign: "center",
  },
  bottomText: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    textAlign: "center",
    color: "#778DA9",
  },
});
