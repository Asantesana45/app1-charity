import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Fundraise: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleCreateFundraiser = () => {
    // Implement your logic here to handle fundraiser creation
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Goal Amount:', goalAmount);
    console.log('Selected Image:', selectedImage);

    // Clear the input fields after submission
    setTitle('');
    setDescription('');
    setGoalAmount('');
    setSelectedImage(null);
    // Add further logic to save data, interact with backend, etc.
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      setSelectedImage(result.uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.heading}>Fundraising Request Form</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Fundraiser Title"
      />
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        value={description}
        onChangeText={setDescription}
        placeholder="Fundraiser Description"
        multiline
      />
      <TextInput
        style={styles.input}
        value={goalAmount}
        onChangeText={setGoalAmount}
        placeholder="Goal Amount (Tsh)"
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        <Text style={styles.imagePickerText}>Select Fundraiser Image</Text>
      </TouchableOpacity>
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
      )}
      <Button
        title="REQUEST FUNDRAISER"
        onPress={handleCreateFundraiser}
        disabled={!title || !description || !goalAmount || !selectedImage}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f3f4f6',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  descriptionInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  imagePicker: {
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#e6f0ff',
  },
  imagePickerText: {
    color: '#007BFF',
    fontSize: 16,
  },
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
  },
});

export default Fundraise;
