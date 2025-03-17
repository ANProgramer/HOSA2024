import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { bundleResourceIO, decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

// Import model
const modelJson = require('../assets/model/model.json');
const modelWeights = require('../assets/model/weights.bin');

// Labels from your model
const LABELS = [
  'Pterygium',
  'Cataract',
  'Normal',
  'Glaucoma',
  'stye',
  'strabismus'
];

class TensorFlowHelper {
  constructor() {
    this.model = null;
    this.isModelLoaded = false;
  }

  async init() {
    try {
      // Initialize TensorFlow.js
      await tf.ready();
      console.log('TensorFlow is ready');
      
      // Load the model
      this.model = await tf.loadLayersModel(bundleResourceIO(modelJson, [modelWeights]));
      this.isModelLoaded = true;
      console.log('Model loaded successfully');
      
      return true;
    } catch (error) {
      console.error('Error initializing TensorFlow:', error);
      return false;
    }
  }

  async preprocessImage(uri) {
    try {
      // Resize the image to match model's expected input size (96x96)
      const resizedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 96, height: 96 } }],
        { format: ImageManipulator.SaveFormat.JPEG }
      );
      
      // Read the image as base64
      const imgB64 = await FileSystem.readAsStringAsync(resizedImage.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      
      // Convert base64 to tensor
      const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
      const raw = new Uint8Array(imgBuffer);
      
      // Decode image
      let imageTensor;
      try {
        // Try the standard decoding method
        imageTensor = decodeJpeg(raw, 3);
      } catch (decodeError) {
        console.log('Standard decoding failed, trying alternative:', decodeError);
        // Fallback to a more compatible method
        imageTensor = tf.browser.fromPixels(
          { data: raw, width: 96, height: 96 },
          3
        );
      }
      
      // Convert to grayscale
      const grayscale = imageTensor.mean(2).expandDims(2);
      
      // Normalize pixel values to [0, 1]
      const normalized = grayscale.div(tf.scalar(255));
      
      // Add batch dimension
      const batched = normalized.expandDims(0);
      
      // Clean up intermediate tensors
      imageTensor.dispose();
      grayscale.dispose();
      
      return batched;
    } catch (error) {
      console.error('Error preprocessing image:', error);
      throw error;
    }
  }

  async predictImage(uri) {
    try {
      if (!this.isModelLoaded) {
        const initialized = await this.init();
        if (!initialized) {
          throw new Error('Failed to initialize TensorFlow');
        }
      }
      
      // Preprocess the image
      const imageTensor = await this.preprocessImage(uri);
      
      // Run model prediction
      const predictions = await this.model.predict(imageTensor);
      
      // Get the data from the tensor
      const probabilities = await predictions.data();
      
      // Clean up tensors
      imageTensor.dispose();
      predictions.dispose();
      
      // Map probabilities to labels
      const results = Array.from(probabilities).map((probability, index) => ({
        name: LABELS[index],
        probability: Math.round(probability * 100)
      }));
      
      // Sort by probability (highest first)
      results.sort((a, b) => b.probability - a.probability);
      
      return results;
    } catch (error) {
      console.error('Error predicting image:', error);
      throw error;
    }
  }

  // Helper method to clean up resources when no longer needed
  dispose() {
    if (this.model) {
      this.model.dispose();
      this.model = null;
      this.isModelLoaded = false;
    }
  }
}

export default new TensorFlowHelper();