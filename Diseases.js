import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Cataract from './Cataract';
import Chalazion from './Chalazion';  
import Hypopyon from './Hypopyon'; 
import Keratitis from './Keratitis'; 
import Pterygium from './Pterygium'; 

const Diseases = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Disease</Text>

      {/* Touchable Opacity for Cataract */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Cataract")}
      >
        <Text style={styles.buttonText}>Cataract</Text>
      </TouchableOpacity>

      {/* Touchable Opacity for Keratitis */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Keratitis')}
      >
        <Text style={styles.buttonText}>Keratitis</Text>
      </TouchableOpacity>

      {/* Touchable Opacity for Pterygium */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Pterygium')}
      >
        <Text style={styles.buttonText}>Pterygium</Text>
      </TouchableOpacity>

      {/* Touchable Opacity for Chalazion */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Chalazion')}
      >
        <Text style={styles.buttonText}>Chalazion</Text>
      </TouchableOpacity>

      {/* Touchable Opacity for Hypopyon */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Hypopyon')}
      >
        <Text style={styles.buttonText}>Hypopyon</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Diseases;