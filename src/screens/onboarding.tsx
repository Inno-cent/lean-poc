import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Onboarding() {
  const [step, setStep] = useState(1); // Track the current onboarding step
  const navigation = useNavigation();

  // Handle next button click
  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigation.navigate("SignUp"); // Navigate to signup when done
    }
  };

  // Handle skip button click
  const handleSkip = () => {
    navigation.navigate("Login"); 
  };

  // Dynamic content for each step
  const getContent = () => {
    switch (step) {
      case 1:
        return {
          title: "High-Quality Video & Audio",
          description:
            "Crystal-clear video and high-quality audio for lifelike, seamless conversations every time.",
          image: require("../assets/images/on1.png"),
          nextText: "Next",
        };
      case 2:
        return {
          title: "Simple and Efficient Contact Management",
          description:
            "Manage contacts effortlessly with our intuitive interface for quick access and seamless organization.",
          image: require("../assets/images/on2.png"),
          nextText: "Next",
        };
      case 3:
        return {
          title: "Smooth Video Calling Starts Here",
          description:
            "Start video calls effortlessly with our intuitive app and stay connected with friends and colleagues.",
          image: require("../assets/images/on3.png"),
          nextText: "Get Started",
        };
      default:
        return {};
    }
  };

  const { title, description, image, nextText } = getContent();

  return (
    <View style={styles.container}>
      <Text style={styles.headText}>{title}</Text>
      <Image source={image} style={styles.image} />
      <Text style={styles.description}>{description}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>{nextText}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>
            {step < 3 ? "Skip" : "Already have an account? Sign In"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  headText: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 40,
    lineHeight: 36,
    color: "#1B263B",
    textAlign: "center",
  },
  nextButton: {
    padding: 12,
    backgroundColor: "#415a77",
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  nextButtonText: {
    fontSize: 15,
    color: "#fff",
  },
  skipButton: {
    alignItems: "center",
    marginTop: 10,
  },
  skipButtonText: {
    fontSize: 15,
    color: "#1B263B",
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginBottom: 50,
  },
  description: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "400",
    color: "#1B263BE5",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
});
