import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import TeachableMachineEyeAnalyzer from './EyeAnalyzer_TeachableMachine'; // Direct TensorFlow.js approach

const AnalysisResults = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { imageUri } = route.params || {};
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [useWebView, setUseWebView] = useState(false); // Set to false to use direct TensorFlow.js

  useEffect(() => {
    analyzeImage();
  }, []);

  const analyzeImage = async () => {
    try {
      setLoading(true);
      
      // Use the direct TensorFlow.js approach
      const analysisResults = await TeachableMachineEyeAnalyzer.analyzeEye(imageUri);
      setResults(analysisResults);
      setError(null);
    } catch (err) {
      console.error('Analysis error:', err);
      setError('There was an error analyzing the image. Please try again.');
      
      // Fallback to mock results for demo
      setResults({
        primaryDiagnosis: {
          condition: 'Keratitis',
          confidence: 86.7,
          description: 'Inflammation of the cornea — the clear, dome-shaped tissue on the front of the eye.',
        },
        otherPossibilities: [
          { condition: 'Conjunctivitis', confidence: 12.5 },
          { condition: 'Cataract', confidence: 0.8 },
        ],
        recommendations: [
          'Avoid wearing contact lenses until examined by a doctor',
          'Apply prescribed antibiotic or antifungal eye drops as directed',
          'Avoid touching or rubbing your eyes',
          'Consult an ophthalmologist for a comprehensive eye examination',
          'Protect your eyes from UV radiation by wearing sunglasses outdoors',
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  const navigateToDisease = (diseaseName) => {
    if (diseaseName === 'Keratitis' || 
        diseaseName === 'Cataract' || 
        diseaseName === 'Pterygium' || 
        diseaseName === 'Chalazion' ||
        diseaseName === 'Hypopyon') {
      navigation.navigate(diseaseName);
    } else {
      // For diseases not in the app yet
      Alert.alert(`About ${diseaseName}`, `Information about ${diseaseName} will be available in a future update.`);
    }
  };

  const retakePhoto = () => {
    navigation.goBack();
  };

  // Render results content after analysis
  const renderResults = () => {
    if (!results) return null;
    
    return (
      <View style={styles.resultsContainer}>
        {/* Primary Finding Card */}
        <View style={styles.diagnosisCard}>
          <Text style={styles.diagnosisTitle}>Primary Finding</Text>
          <View style={styles.diagnosisContent}>
            <Text style={styles.conditionName}>{results.primaryDiagnosis.condition}</Text>
            <View style={styles.confidenceContainer}>
              <Text style={styles.confidenceText}>
                Confidence: {results.primaryDiagnosis.confidence}%
              </Text>
              <View style={styles.confidenceBar}>
                <View 
                  style={[
                    styles.confidenceFill, 
                    {width: `${results.primaryDiagnosis.confidence}%`},
                    results.primaryDiagnosis.confidence > 70 ? styles.confidenceHigh : 
                    results.primaryDiagnosis.confidence > 40 ? styles.confidenceMedium : 
                    styles.confidenceLow
                  ]} 
                />
              </View>
            </View>
            <Text style={styles.conditionDescription}>
              {results.primaryDiagnosis.description}
            </Text>
            
            <TouchableOpacity 
              style={styles.learnMoreButton}
              onPress={() => navigateToDisease(results.primaryDiagnosis.condition)}
            >
              <Text style={styles.learnMoreText}>Learn More</Text>
              <Icon name="arrow-forward" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Other Possibilities Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Other Possibilities</Text>
          {results.otherPossibilities && results.otherPossibilities.length > 0 ? (
            results.otherPossibilities.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.alternativeItem}
                onPress={() => navigateToDisease(item.condition)}
              >
                <View style={styles.alternativeItemContent}>
                  <Text style={styles.alternativeName}>{item.condition}</Text>
                  <Text style={styles.alternativeConfidence}>{item.confidence}%</Text>
                </View>
                <Icon name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noAlternativesText}>No other significant conditions detected</Text>
          )}
        </View>
        
        {/* Recommendations Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recommendations</Text>
          {results.recommendations && results.recommendations.map((item, index) => (
            <View key={index} style={styles.recommendationItem}>
              <View style={styles.recommendationBullet}>
                <Icon name="checkmark" size={16} color="#fff" />
              </View>
              <Text style={styles.recommendationText}>{item}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.saveButton]}
            onPress={() => Alert.alert('Save Results', 'Results saved to your health records')}
          >
            <Icon name="save-outline" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Save Results</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.shareButton]}
            onPress={() => Alert.alert('Share', 'Sharing functionality coming soon')}
          >
            <Icon name="share-social-outline" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.disclaimer}>
          <Icon name="warning-outline" size={20} color="#ff9800" />
          <Text style={styles.disclaimerText}>
            This analysis is not a medical diagnosis. Please consult a healthcare professional.
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6a11cb', '#2575fc']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Analysis Results</Text>
        </View>
      </LinearGradient>
      
      {/* Direct TensorFlow.js approach */}
      <ScrollView style={styles.content}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <Text style={styles.imageCaption}>Analyzed Eye Image</Text>
        </View>
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2575fc" />
            <Text style={styles.loadingText}>Analyzing your eye image...</Text>
            <Text style={styles.loadingSubtext}>Our AI is looking for signs of eye conditions</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Icon name="alert-circle-outline" size={60} color="#ff6b6b" />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retakeButton} onPress={retakePhoto}>
              <Text style={styles.retakeButtonText}>Take Another Photo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          renderResults()
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 8,
    marginRight: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: Dimensions.get('window').width - 64,
    height: Dimensions.get('window').width - 64,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  imageCaption: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  loadingSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retakeButton: {
    backgroundColor: '#2575fc',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  retakeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resultsContainer: {
    paddingBottom: 30,
  },
  diagnosisCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  diagnosisTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#2575fc',
    padding: 12,
  },
  diagnosisContent: {
    padding: 16,
  },
  conditionName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  confidenceContainer: {
    marginBottom: 16,
  },
  confidenceText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  confidenceBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  confidenceFill: {
    height: '100%',
    borderRadius: 4,
  },
  confidenceHigh: {
    backgroundColor: '#4caf50',
  },
  confidenceMedium: {
    backgroundColor: '#ff9800',
  },
  confidenceLow: {
    backgroundColor: '#f44336',
  },
  conditionDescription: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
    marginBottom: 16,
  },
  learnMoreButton: {
    backgroundColor: '#2575fc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  learnMoreText: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  alternativeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  alternativeItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alternativeName: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  alternativeConfidence: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  noAlternativesText: {
    padding: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  recommendationBullet: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4caf50',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  recommendationText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 0.48,
  },
  saveButton: {
    backgroundColor: '#4caf50',
  },
  shareButton: {
    backgroundColor: '#2196f3',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff9e3',
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  disclaimerText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#795548',
    lineHeight: 20,
  },
});

export default AnalysisResults;