import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const OutgoingCallScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Calling...</Text>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.status}>Please wait for the recipient to answer.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    marginTop: 20,
  },
});

export default OutgoingCallScreen;
