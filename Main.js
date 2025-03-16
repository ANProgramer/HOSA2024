import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Modal, TextInput, TouchableWithoutFeedback, FlatList } from 'react-native';

const Main = () => {
  const [isProfileVisible, setProfileVisible] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    memberSince: '2023',
  });
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);

  const eyeDiseases = [
    { id: 1, name: 'Cataracts', icon: '👁️' },
    { id: 2, name: 'Glaucoma', icon: '👓' },
    { id: 3, name: 'Conjunctivitis', icon: '🩺' },
    { id: 4, name: 'Dry Eye', icon: '💧' },
  ];

  const qa = [
    { id: 1, question: 'How does Optify work?', answer: 'Optify uses AI to analyze images of your eye and provide insights into potential eye conditions.' },
    { id: 2, question: 'Is my data secure?', answer: 'Yes, we prioritize your privacy and ensure that all data is securely stored and processed.' },
    { id: 3, question: 'Can I trust the results?', answer: 'While Optify provides accurate insights, it is always recommended to consult a healthcare professional for a definitive diagnosis.' },
  ];

  const dailyTips = [
    { id: 1, tip: 'Take regular breaks from screens using the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.' },
    { id: 2, tip: 'Stay hydrated to prevent dry eyes. Drink at least 8 glasses of water a day.' },
    { id: 3, tip: 'Wear sunglasses with UV protection to shield your eyes from harmful sun rays.' },
    { id: 4, tip: 'Eat a diet rich in leafy greens, fish, and nuts to support eye health.' },
    { id: 5, tip: 'Avoid rubbing your eyes to prevent irritation and potential infections.' },
    { id: 6, tip: 'Ensure proper lighting when reading or working to reduce eye strain.' },
  ];

  const toggleAnswer = (id) => {
    setExpandedQuestionId(expandedQuestionId === id ? null : id);
  };

  const handleEditProfile = () => {
    setIsEditingProfile(!isEditingProfile);
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    // Here you can add logic to save the updated profile data to a backend or local storage
  };

  const handleInputChange = (field, value) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const renderTipItem = ({ item }) => (
    <View style={styles.tipItem}>
      <Text style={styles.tipText}>💡 {item.tip}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>Optify</Text>
        <Text style={styles.tagline}>Your AI-Powered Eye Health Companion</Text>
        <TouchableOpacity style={styles.profileIcon} onPress={() => setProfileVisible(true)}>
          <Text style={styles.profileIconText}>👤</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Scan My Eye</Text>
        <Text style={styles.uploadButtonIcon}>📷</Text>
      </TouchableOpacity>
      <Text style={styles.instructionText}>
        Take a clear photo of your eye or upload an existing image for analysis.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Learn About Eye Diseases</Text>
        <View style={styles.diseaseGrid}>
          {eyeDiseases.map((disease) => (
            <TouchableOpacity key={disease.id} style={styles.diseaseItem}>
              <Text style={styles.diseaseIcon}>{disease.icon}</Text>
              <Text style={styles.diseaseName}>{disease.name}</Text>
              <Text style={styles.learnMoreText}>Learn More</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Eye Care Tips</Text>
        <FlatList
          data={dailyTips}
          renderItem={renderTipItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tipsContainer}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Q&A</Text>
        {qa.map((item) => (
          <TouchableOpacity key={item.id} style={styles.qaItem} onPress={() => toggleAnswer(item.id)}>
            <Text style={styles.questionText}>{item.question}</Text>
            {expandedQuestionId === item.id && <Text style={styles.answerText}>{item.answer}</Text>}
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        transparent={true}
        visible={isProfileVisible}
        onRequestClose={() => setProfileVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setProfileVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Profile</Text>
              {isEditingProfile ? (
                <>
                  <TextInput
                    style={styles.input}
                    value={profileData.name}
                    onChangeText={(text) => handleInputChange('name', text)}
                    placeholder="Name"
                  />
                  <TextInput
                    style={styles.input}
                    value={profileData.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                    placeholder="Email"
                  />
                  <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
                    <Text style={styles.saveButtonText}>Save</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={styles.profileText}>Name: {profileData.name}</Text>
                  <Text style={styles.profileText}>Email: {profileData.email}</Text>
                  <Text style={styles.profileText}>Member Since: {profileData.memberSince}</Text>
                  <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                    <Text style={styles.editButtonText}>Edit Profile</Text>
                  </TouchableOpacity>
                </>
              )}
              <TouchableOpacity style={styles.closeButton} onPress={() => setProfileVisible(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eef5ff', padding: 16 },
  header: { alignItems: 'center', marginBottom: 24, position: 'relative' },
  appName: { 
    fontSize: 48, 
    fontWeight: 'bold', 
    color: '#0056b3', 
    fontFamily: 'serif', 
    textTransform: 'uppercase', 
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 86, 179, 0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  tagline: { 
    fontSize: 18, 
    color: '#333', 
    marginTop: 8, 
    fontStyle: 'italic', 
    textAlign: 'center',
    fontFamily: 'sans-serif-light',
  },
  profileIcon: { 
    position: 'absolute', 
    right: 0, 
    top: 0, 
    padding: 10,
  },
  profileIconText: {
    fontSize: 24,
  },
  uploadButton: { 
    backgroundColor: '#007bff', 
    padding: 16, 
    borderRadius: 12, 
    alignItems: 'center', 
    flexDirection: 'row', 
    justifyContent: 'center', 
    shadowColor: '#000', 
    shadowOpacity: 0.2, 
    shadowRadius: 5, 
    elevation: 5,
    marginBottom: 16,
  },
  uploadButtonText: { 
    color: '#fff', 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginRight: 8,
    fontFamily: 'sans-serif-medium',
  },
  uploadButtonIcon: { 
    fontSize: 26,
  },
  instructionText: { 
    fontSize: 15, 
    color: '#666', 
    textAlign: 'center', 
    marginBottom: 24,
    fontFamily: 'sans-serif',
  },
  section: { 
    marginBottom: 24,
  },
  sectionTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#0056b3', 
    marginBottom: 16,
    fontFamily: 'serif',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  diseaseGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
  },
  diseaseItem: { 
    backgroundColor: '#fff', 
    width: '48%', 
    padding: 16, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginBottom: 16, 
    shadowColor: '#000', 
    shadowOpacity: 0.2, 
    shadowRadius: 5, 
    elevation: 3,
  },
  diseaseIcon: { 
    fontSize: 40, 
    marginBottom: 8,
  },
  diseaseName: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 8,
    fontFamily: 'sans-serif-medium',
  },
  learnMoreText: { 
    color: '#007bff', 
    fontSize: 15,
    fontFamily: 'sans-serif',
  },
  tipsContainer: { 
    paddingVertical: 8,
  },
  tipItem: { 
    backgroundColor: '#fff', 
    padding: 16, 
    borderRadius: 10, 
    marginRight: 16, 
    width: 300, 
    shadowColor: '#000', 
    shadowOpacity: 0.2, 
    shadowRadius: 5, 
    elevation: 3,
  },
  tipText: { 
    fontSize: 16, 
    color: '#333',
    fontFamily: 'sans-serif',
  },
  qaItem: { 
    backgroundColor: '#fff', 
    padding: 16, 
    borderRadius: 10, 
    marginBottom: 8, 
    shadowColor: '#000', 
    shadowOpacity: 0.2, 
    shadowRadius: 5, 
    elevation: 3,
  },
  questionText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 8,
    fontFamily: 'sans-serif-medium',
  },
  answerText: { 
    fontSize: 16, 
    color: '#666',
    fontFamily: 'sans-serif',
  },
  modalOverlay: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: { 
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 10, 
    width: '80%',
  },
  modalTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#0056b3', 
    marginBottom: 16,
    fontFamily: 'serif',
  },
  profileText: { 
    fontSize: 16, 
    color: '#333', 
    marginBottom: 8,
    fontFamily: 'sans-serif',
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 5, 
    padding: 10, 
    marginBottom: 16,
    fontFamily: 'sans-serif',
  },
  editButton: { 
    backgroundColor: '#007bff', 
    padding: 10, 
    borderRadius: 5, 
    alignItems: 'center', 
    marginTop: 16,
  },
  editButtonText: { 
    color: '#fff', 
    fontSize: 16,
    fontFamily: 'sans-serif-medium',
  },
  saveButton: { 
    backgroundColor: '#28a745', 
    padding: 10, 
    borderRadius: 5, 
    alignItems: 'center', 
    marginTop: 16,
  },
  saveButtonText: { 
    color: '#fff', 
    fontSize: 16,
    fontFamily: 'sans-serif-medium',
  },
  closeButton: { 
    backgroundColor: '#dc3545', 
    padding: 10, 
    borderRadius: 5, 
    alignItems: 'center', 
    marginTop: 16,
  },
  closeButtonText: { 
    color: '#fff', 
    fontSize: 16,
    fontFamily: 'sans-serif-medium',
  },
});

export default Main;