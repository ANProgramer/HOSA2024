import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Pterygium = () => {
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
        <Text style={styles.title}>Pterygium</Text>
      </LinearGradient>

      <View style={styles.contentContainer}>
        {/* Introduction Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>What is a Pterygium?</Text>
          <Text style={styles.cardText}>
            A pterygium is a non-cancerous growth of the conjunctiva, a mucous membrane that covers the white part of the eye. It often appears as a fleshy, triangular tissue growth on the cornea and is commonly caused by prolonged exposure to UV light, dust, or wind.
          </Text>
          <Image
            source={require('./Pterygium.jpg')} // Replace with a real image URL
            style={styles.image}
          />
        </View>

        {/* Symptoms Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Symptoms</Text>
          <Text style={styles.cardText}>
            <Text style={{ fontWeight: 'bold' }}>- Eye Redness:</Text> The affected eye may appear red or irritated.{'\n'}
            <Text style={{ fontWeight: 'bold' }}>- Dryness:</Text> A feeling of dryness or grittiness in the eye.{'\n'}
            <Text style={{ fontWeight: 'bold' }}>- Blurred Vision:</Text> If the growth covers the cornea, it may cause blurred vision.{'\n'}
            <Text style={{ fontWeight: 'bold' }}>- Visible Growth:</Text> A fleshy, pinkish growth on the white part of the eye.{'\n'}
            <Text style={{ fontWeight: 'bold' }}>- Itching or Burning:</Text> Mild itching or burning sensation in the eye.{'\n'}
          </Text>
        </View>

        {/* Treatments Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Treatments</Text>
          <Text style={styles.cardText}>
            <Text style={{ fontWeight: 'bold' }}>- Artificial Tears:</Text> Lubricating eye drops to relieve dryness and irritation.{'\n'}
            <Text style={{ fontWeight: 'bold' }}>- Steroid Eye Drops:</Text> To reduce inflammation and redness.{'\n'}
            <Text style={{ fontWeight: 'bold' }}>- Surgery:</Text> If the pterygium affects vision or causes significant discomfort, surgical removal may be recommended.{'\n'}
            <Text style={{ fontWeight: 'bold' }}>- UV Protection:</Text> Wearing sunglasses to prevent further UV damage.{'\n'}
            <Text style={{ fontWeight: 'bold' }}>- Regular Monitoring:</Text> Regular eye exams to monitor the growth and prevent complications.{'\n'}
          </Text>
        </View>

        {/* External Resources */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Learn More</Text>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => openLink('https://www.mayoclinic.org/diseases-conditions/pterygium/symptoms-causes/syc-20353863')}
          >
            <Text style={styles.linkButtonText}>Mayo Clinic - Pterygium</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => openLink('https://www.webmd.com/eye-health/pterygium-surfers-eye')}
          >
            <Text style={styles.linkButtonText}>WebMD - Pterygium</Text>
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

export default Pterygium;