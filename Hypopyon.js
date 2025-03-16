import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Hypopyon = () => {
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
        <Text style={styles.title}>Hypopyon</Text>
      </LinearGradient>

      <View style={styles.contentContainer}>
        {/* Introduction Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>What is Hypopyon?</Text>
          <Text style={styles.cardText}>
            Hypopyon is the accumulation of white blood cells in the anterior chamber of the eye, often seen as a white or yellowish fluid layer at the bottom of the eye. It is usually a sign of severe inflammation or infection, such as endophthalmitis or uveitis.
          </Text>
          <Image
            source={require('./Hypopyon.jpg')} // Replace with a real image URL
            style={styles.image}
          />
        </View>

        {/* Symptoms Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Symptoms</Text>
          <Text style={styles.cardText}>
            <Text style={{ fontWeight: 'bold' }}>- Eye Redness:</Text> The eye may appear red or inflamed.{'\n'}
            <Text style={{ fontWeight: 'bold' }}>- Pain:</Text> Severe eye pain or discomfort.{'\n'}
            <Text style={{ fontWeight: 'bold' }}>- Blurred Vision:</Text> Vision may become blurry or hazy.{'\n'}
            <Text style={{ fontWeight: 'bold' }}>- Sensitivity to Light:</Text> Increased sensitivity to light (photophobia).{'\n'}
            <Text style={{ fontWeight: 'bold' }}>- Visible Fluid:</Text> A white or yellowish layer at the bottom of the eye.{'\n'}
          </Text>
        </View>

        {/* Treatments Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Treatments</Text>
          <Text style={styles.cardText}>
            <Text style={{ fontWeight: 'bold' }}>- Antibiotics:</Text> For bacterial infections, antibiotic eye drops or injections may be prescribed.{'\n'}
            <Text style={{ fontWeight: 'bold' }}>- Steroids:</Text> To reduce inflammation, steroid eye drops or oral medications may be used.{'\n'}
            <Text style={{ fontWeight: 'bold' }}>- Antifungal Medications:</Text> For fungal infections, antifungal treatments are necessary.{'\n'}
            <Text style={{ fontWeight: 'bold' }}>- Surgery:</Text> In severe cases, such as endophthalmitis, surgery may be required to remove infected tissue.{'\n'}
            <Text style={{ fontWeight: 'bold' }}>- Regular Monitoring:</Text> Frequent follow-ups with an ophthalmologist to monitor progress.{'\n'}
          </Text>
        </View>

        {/* External Resources */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Learn More</Text>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => openLink('https://www.mayoclinic.org/diseases-conditions/endophthalmitis/symptoms-causes/syc-20371662')}
          >
            <Text style={styles.linkButtonText}>Mayo Clinic - Endophthalmitis</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => openLink('https://www.webmd.com/eye-health/hypopyon')}
          >
            <Text style={styles.linkButtonText}>WebMD - Hypopyon</Text>
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

export default Hypopyon;