import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Keratitis = () => {
  // Function to open external links
  const openLink = (url) => {
    Linking.openURL(url).catch((err) => console.error('Failed to open link:', err));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <LinearGradient
        colors={['#6a11cb', '#2575fc']}
        style={styles.gradientBackground}
      >
        <Text style={styles.title}>Keratitis</Text>
      </LinearGradient>

      <View style={styles.contentContainer}>
        {/* Introduction Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>What is Keratitis?</Text>
          <Text style={styles.cardText}>
            Keratitis is an inflammation of the cornea, the clear dome-shaped surface that covers the front of the eye. It can be caused by infections, injuries, or underlying conditions, and if left untreated, it may lead to vision loss.
          </Text>
          <Image
            source={require('./Keratitis.jpg')} // Replace with a real image URL
            style={styles.image}
          />
        </View>

        {/* Symptoms Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Symptoms</Text>
          <Text style={styles.cardText}>
            <Text style={{ fontWeight: 'bold' }}>- Eye Redness:</Text> The eye may appear red or bloodshot.{'\n'}
            <Text style={{ fontWeight: 'bold' }}>- Pain:</Text> Mild to severe eye pain or discomfort.{'\n'}
            <Text style={{ fontWeight: 'bold' }}>- Blurred Vision:</Text> Vision may become blurry or hazy.{'\n'}
            <Text style={{ fontWeight: 'bold' }}>- Sensitivity to Light:</Text> Increased sensitivity to light (photophobia).{'\n'}
            <Text style={{ fontWeight: 'bold' }}>- Tearing:</Text> Excessive tearing or discharge from the eye.{'\n'}
          </Text>
        </View>

        {/* Treatments Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Treatments</Text>
          <Text style={styles.cardText}>
            <Text style={{ fontWeight: 'bold' }}>- Antibiotic Eye Drops:</Text> For bacterial keratitis, antibiotic eye drops are prescribed.{'\n'}
            <Text style={{ fontWeight: 'bold' }}>- Antifungal Medications:</Text> For fungal keratitis, antifungal eye drops or oral medications are used.{'\n'}
            <Text style={{ fontWeight: 'bold' }}>- Antiviral Drugs:</Text> For viral keratitis, antiviral eye drops or oral medications may be necessary.{'\n'}
            <Text style={{ fontWeight: 'bold' }}>- Steroid Eye Drops:</Text> To reduce inflammation, but only under a doctor's supervision.{'\n'}
            <Text style={{ fontWeight: 'bold' }}>- Surgery:</Text> In severe cases, a corneal transplant may be required.{'\n'}
          </Text>
        </View>

        {/* External Resources */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Learn More</Text>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => openLink('https://www.mayoclinic.org/diseases-conditions/keratitis/symptoms-causes/syc-20374110')}
          >
            <Text style={styles.linkButtonText}>Mayo Clinic - Keratitis</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => openLink('https://www.webmd.com/eye-health/keratitis')}
          >
            <Text style={styles.linkButtonText}>WebMD - Keratitis</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
  },
  gradientBackground: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  contentContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  linkButton: {
    backgroundColor: '#2575fc',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  linkButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Keratitis;