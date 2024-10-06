import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
 // Importing arrow icons

// Enable LayoutAnimation for Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Smooth animation
    setIsOpen((prevState) => !prevState);
  };

  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={toggleAccordion}
      >
        <Text
         numberOfLines={isOpen ? 2 : 1}
          ellipsizeMode="tail"
          style={styles.accordionTitle}
        >
          {title}
        </Text>
        <Entypo
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={24}
          color="#1B263B"
        />
      </TouchableOpacity>

      {isOpen && <View style={styles.accordionContent}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  accordionContainer: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#1B263B",
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  accordionTitle: {
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 30,
    color: "#1B263B",
    maxWidth: '90%', 
    marginRight: 10,
  },
  accordionContent: {
    fontSize: 18,
    fontWeight: "400",
    lineHeight: 27,
    color: "#1B263B",
    paddingVertical: 10,
    paddingHorizontal: 5,
    // backgroundColor: '#F5F5F5',
  },
});

export default Accordion;
