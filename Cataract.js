import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Cataract = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cataract</Text>
      <Text style={styles.description}>
        A cataract is a clouding of the eye's natural lens, which lies behind the iris and the pupil.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default Cataract;