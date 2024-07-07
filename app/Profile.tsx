import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

const Profile = () => {
  const [name, setName] = useState('Johnson Baraka Munisi');
  const [email, setEmail] = useState('johnsonmunisi2021@gmail.com');
  const [phone, setPhone] = useState('+255-692-527-140');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const [savedName, setSavedName] = useState(name);
  const [savedEmail, setSavedEmail] = useState(email);
  const [savedPhone, setSavedPhone] = useState(phone);
  const [savedAddress, setSavedAddress] = useState(address);

  const handleSave = () => {
    setSavedName(name);
    setSavedEmail(email);
    setSavedPhone(phone);
    setSavedAddress(address);
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
  };

  const handleUpdate = () => {
    // TO DO: implement update logic
  };

  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={handleImageUpload}>
          <View style={styles.profileImageContainer}>
            {image ? (
              <Image source={{ uri: image }} style={styles.profileImage} />
            ) : (
              <View style={styles.defaultProfileImage}>
                <Text style={styles.uploadText}>Upload Photo</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.savedInfoContainer}>
          <Text style={styles.savedInfoText}>
            <Text style={styles.label}>Name:</Text> {savedName}
          </Text>
          <Text style={styles.savedInfoText}>
            <Text style={styles.label}>Email:</Text> {savedEmail}
          </Text>
          <Text style={styles.savedInfoText}>
            <Text style={styles.label}>Phone:</Text> {savedPhone}
          </Text>
          <Text style={styles.savedInfoText}>
            <Text style={styles.label}>Address:</Text> {savedAddress}
          </Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          label="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
          mode="outlined"
          theme={{ colors: { primary: '#337ab7' } }}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          mode="outlined"
          theme={{ colors: { primary: '#337ab7' } }}
        />
        <TextInput
          label="Phone"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          style={styles.input}
          mode="outlined"
          theme={{ colors: { primary: '#337ab7' } }}
        />
        <TextInput
          label="Address"
          value={address}
          onChangeText={(text) => setAddress(text)}
          style={styles.input}
          mode="outlined"
          theme={{ colors: { primary: '#337ab7' } }}
        />
        <Button mode="contained" onPress={handleSave} style={styles.button}>
          Save
        </Button>
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  header: {
    backgroundColor: '#337ab7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'serif',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#337ab7',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  defaultProfileImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 16,
    color: '#337ab7',
  },
  savedInfoContainer: {
    flex: 1,
    marginLeft: 20,
  },
  savedInfoText: {
    fontSize: 18,
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#337ab7',
  },
});

export default Profile;
