import React from 'react';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import { Asset } from 'expo-asset';
import { Platform } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import { fetch } from 'react-native-fetch-api';
import { bundleResourceIO, decodeJpeg } from '@tensorflow/tfjs-react-native';

class TeachableMachineEyeAnalyzer {
  constructor() {
    this.model = null;
    this.isModelReady = false;
    this.metadata = null;
    this.classes = [];
  }

  async loadModel() {
    try {
      // Initialize TensorFlow.js
      await tf.ready();
      console.log('TensorFlow.js is ready');

      // Get the model directory path
      const modelDir = FileSystem.documentDirectory + 'my_model/';
      
      // Check if model directory exists, if not create it
      const dirInfo = await FileSystem.getInfoAsync(modelDir);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(modelDir, { intermediates: true });
      }

      // Define paths for model and metadata files
      const modelJsonPath = modelDir + 'model.json';
      const metadataJsonPath = modelDir + 'metadata.json';
      
      // Check if model files exist, if not copy from assets
      const modelJsonExists = await FileSystem.getInfoAsync(modelJsonPath);
      const metadataJsonExists = await FileSystem.getInfoAsync(metadataJsonPath);
      
      // If files don't exist, copy them from assets
      if (!modelJsonExists.exists || !metadataJsonExists.exists) {
        console.log('Copying model files from assets to document directory');
        
        // Copy model.json from assets
        const modelJsonAsset = Asset.fromModule(require('../assets/my_model/model.json'));
        await modelJsonAsset.downloadAsync();
        await FileSystem.copyAsync({
          from: modelJsonAsset.uri,
          to: modelJsonPath
        });
        
        // Copy metadata.json from assets
        const metadataJsonAsset = Asset.fromModule(require('../assets/my_model/metadata.json'));
        await metadataJsonAsset.downloadAsync();
        await FileSystem.copyAsync({
          from: metadataJsonAsset.uri,
          to: metadataJsonPath
        });
        
        // Copy weight files (these would be named like group1-shard1of1.bin, etc.)
        // Note: You'll need to add all your weight files here
        const weightAsset = Asset.fromModule(require('../assets/my_model/weights.bin'));
        await weightAsset.downloadAsync();
        await FileSystem.copyAsync({
          from: weightAsset.uri,
          to: modelDir + 'weights.bin'
        });
      }
      
      // Load metadata to get class names
      const metadataContent = await FileSystem.readAsStringAsync(metadataJsonPath);
      this.metadata = JSON.parse(metadataContent);
      this.classes = this.metadata.labels || [];
      console.log('Classes loaded:', this.classes);
      
      // Load the model
      this.model = await tf.loadLayersModel(`file://${modelJsonPath}`);
      console.log('Model loaded successfully');
      
      // Warm up the model
      const dummyInput = tf.zeros([1, 200, 200, 3]); // Adjust input shape as needed
      const warmupResult = await this.model.predict(dummyInput);
      warmupResult.dispose();
      dummyInput.dispose();
      
      this.isModelReady = true;
      console.log('Model is ready for inference');
      return true;
    } catch (error) {
      console.error('Failed to load model:', error);
      return false;
    }
  }

  async preprocessImage(uri) {
    try {
      // Get model input shape from metadata or default to 200x200
      const inputWidth = this.metadata?.imageSize?.width || 200;
      const inputHeight = this.metadata?.imageSize?.height || 200;
      
      // Resize image to match input size
      const resizedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: inputWidth, height: inputHeight } }],
        { format: 'jpeg' }
      );
      
      // Read the image file
      const imgB64 = await FileSystem.readAsStringAsync(resizedImage.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      
      // Decode the image to a tensor
      const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
      const raw = new Uint8Array(imgBuffer);
      const imgTensor = decodeJpeg(raw);
      
      // Normalize the image (Teachable Machine models expect values in [0, 1])
      const normalized = tf.div(imgTensor, tf.scalar(255.0));
      
      // Expand dimensions to match model input shape [1, height, width, 3]
      const batched = normalized.expandDims(0);
      
      // Clean up
      imgTensor.dispose();
      normalized.dispose();
      
      return batched;
    } catch (error) {
      console.error('Error preprocessing image:', error);
      throw error;
    }
  }

  async analyzeEye(imageUri) {
    if (!this.isModelReady) {
      const loaded = await this.loadModel();
      if (!loaded) {
        throw new Error('Model failed to load');
      }
    }
    
    try {
      // Preprocess the image for the model
      const tensor = await this.preprocessImage(imageUri);
      
      // Run inference
      const predictions = await this.model.predict(tensor);
      
      // Get results
      const probabilities = await predictions.data();
      
      // Cleanup tensors
      tensor.dispose();
      predictions.dispose();
      
      // Format results - combine class names with probabilities
      const results = Array.from(probabilities)
        .map((probability, index) => ({
          disease: this.classes[index] || `Class ${index}`,
          probability: probability * 100  // Convert to percentage
        }))
        .sort((a, b) => b.probability - a.probability);
      
      // Prepare formatted results
      const primaryDiagnosis = {
        condition: results[0].disease,
        confidence: parseFloat(results[0].probability.toFixed(1)),
        description: this.getDiseaseDescription(results[0].disease)
      };
      
      const otherPossibilities = results.slice(1, 3).map(item => ({
        condition: item.disease,
        confidence: parseFloat(item.probability.toFixed(1))
      }));
      
      const recommendations = this.getRecommendations(primaryDiagnosis.condition);
      
      return {
        primaryDiagnosis,
        otherPossibilities,
        recommendations
      };
    } catch (error) {
      console.error('Error analyzing eye image:', error);
      throw error;
    }
  }
  
  getDiseaseDescription(disease) {
    // Generic descriptions that can be updated once we know the actual classes
    const descriptions = {
      'Cataract': 'A clouding of the eye\'s natural lens, which lies behind the iris and the pupil.',
      'Keratitis': 'Inflammation of the cornea — the clear, dome-shaped tissue on the front of the eye.',
      'Pterygium': 'A growth of pink, fleshy tissue on the conjunctiva, often extending onto the cornea.',
      'Chalazion': 'A small bump on the eyelid caused by a blocked oil gland.',
      'Hypopyon': 'A collection of white blood cells in the anterior chamber of the eye, often a sign of severe inflammation or infection.',
      'Normal': 'No apparent eye disease detected in the image.',
    };
    
    return descriptions[disease] || 'An eye condition that affects vision or eye health.';
  }
  
  getRecommendations(disease) {
    const commonRecommendations = [
      'Consult an ophthalmologist for a comprehensive eye examination',
      'Protect your eyes from UV radiation by wearing sunglasses outdoors'
    ];
    
    // Generic recommendations based on common eye disease management principles
    const specificRecommendations = {
      'Cataract': [
        'Avoid driving at night if you experience glare or halos',
        'Consider discussing surgical options with your doctor if vision is significantly affected',
        'Ensure your eyeglass prescription is up to date'
      ],
      'Keratitis': [
        'Avoid wearing contact lenses until examined by a doctor',
        'Apply prescribed antibiotic or antifungal eye drops as directed',
        'Avoid touching or rubbing your eyes'
      ],
      'Pterygium': [
        'Use artificial tears for dryness or irritation',
        'Wear UV-blocking sunglasses and wide-brimmed hats outdoors',
        'Avoid dusty and windy environments when possible'
      ],
      'Chalazion': [
        'Apply warm compresses to the affected eye several times daily',
        'Gently massage the affected area to help drain the blocked gland',
        'Avoid eye makeup until the chalazion resolves'
      ],
      'Hypopyon': [
        'Seek immediate medical attention as this may indicate serious infection',
        'Take prescribed antibiotics or anti-inflammatory medication as directed',
        'Avoid contact lens wear and eye makeup'
      ],
      'Normal': [
        'Continue regular eye check-ups (at least once every two years)',
        'Follow the 20-20-20 rule when using digital devices: every 20 minutes, look at something 20 feet away for 20 seconds',
        'Maintain a balanced diet rich in eye-healthy nutrients like omega-3 fatty acids and vitamins A, C, and E'
      ]
    };
    
    // Return disease-specific recommendations if available, or generic ones
    const diseaseRecs = specificRecommendations[disease] || [
      'Schedule a consultation with an eye specialist',
      'Follow proper eye hygiene practices',
      'Report any changes in symptoms to your healthcare provider'
    ];
    
    return [...diseaseRecs, ...commonRecommendations];
  }
}

export default new TeachableMachineEyeAnalyzer();