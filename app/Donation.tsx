import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

interface Campaign {
  id: string;
  title: string;
  raised: string;
  image: string;
  description: string;
  organizer: string;
  organizerContact: string;
  controlNumber: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  campaigns: Campaign[];
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Education',
    icon: <Ionicons name="school" size={24} color="blue" />,
    campaigns: [
      {
        id: '1',
        title: 'Fund Education for Underprivileged Kids',
        raised: 'Tsh 1,245,780 raised',
        image: 'https://www.care-international.org/sites/default/files/styles/media_block_small/public/2022-04/Sudan_The%20Entrepreneur%20Fighting%20for%20Change_Resource%20ID%2084193.JPG.webp?itok=-rH5VM0x',
        description: 'We are committed to providing educational opportunities for underprivileged children. Your donation will help us fund scholarships, books, and other resources needed for their success.',
        organizer: 'Alice Johnson',
        organizerContact: '+255112233445',
        controlNumber: '4343-2434-1332-1333',
      },
    ],
  },
  {
    id: '2',
    name: 'Health',
    icon: <FontAwesome name="heartbeat" size={24} color="red" />,
    campaigns: [
      {
        id: '2',
        title: 'Help Lou Koller Fight Cancer',
        raised: 'Tsh 2,515,263 raised',
        image: 'https://th.bing.com/th/id/OIP.b6W-uulh2r-fYWpEjJf6XQHaDi?rs=1&pid=ImgDetMain',
        description: 'Lou Koller, a well-known figure in the music scene, is battling cancer. We are raising funds to support his medical treatment and care. Every contribution makes a difference. Join us in helping Lou fight this battle.',
        organizer: 'John Smith',
        organizerContact: '+255123456789',
        controlNumber: '4343-2434-1332-1333',
      },
    ],
  },
  {
    id: '3',
    name: 'Food',
    icon: <MaterialIcons name="restaurant" size={24} color="green" />,
    campaigns: [
      {
        id: '3',
        title: 'Support Zahavi Family Recovery from Fire',
        raised: 'Tsh 345,130 raised',
        image: 'https://media.istockphoto.com/photos/african-family-group-of-kids-and-teenagers-picture-id1257529673?k=6&m=1257529673&s=612x612&w=0&h=1g5jvB8p7BhL34CgrrGlO4z5sty-T6FzjBE28b-QoaM=',
        description: 'The Zahavi family lost their home in a recent fire. We are raising funds to help them rebuild their lives and provide them with the support they need to recover.',
        organizer: 'Jane Doe',
        organizerContact: '+255987654321',
        controlNumber: '4343-2434-1332-1333',
      },
    ],
  },
];

const Donation: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [donationAmount, setDonationAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [donorPhoneNumber, setDonorPhoneNumber] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [selectedGateway, setSelectedGateway] = useState<string>('Airtel');
  const [pin, setPin] = useState<string>('');
  const [isPinModalVisible, setIsPinModalVisible] = useState<boolean>(false);

  const handleCategoryPress = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleCampaignPress = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
  };

  const handleDonate = () => {
    if (!selectedCampaign) {
      Alert.alert('Error', 'Please select a campaign to donate.');
      return;
    }
    // Reset fields
    setDonorName('');
    setDonorPhoneNumber('');
    setDonorEmail('');
    setSelectedGateway('Airtel');
    setDonationAmount('');
  };

  const handlePay = () => {
    if (!donationAmount || !donorPhoneNumber) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setIsPinModalVisible(true);
  };

  const handleSendPin = () => {
    setIsPinModalVisible(false);
    Alert.alert('Thank you for your donation!', '', [{ text: 'OK', onPress: () => handleDonate() }]);
  };

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategoryPress(item)}>
      {item.icon}
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  

  const renderCampaignItem = ({ item }: { item: Campaign }) => (
    <TouchableOpacity style={styles.campaignItem} onPress={() => handleCampaignPress(item)}>
      <Image source={{ uri: item.image }} style={styles.campaignImage} />
      <View style={styles.campaignDetails}>
        <Text style={styles.campaignTitle}>{item.title}</Text>
        <Text style={styles.campaignRaised}>{item.raised}</Text>
        <TouchableOpacity
          style={styles.donateButton}
          onPress={() => setSelectedCampaign(item)}
        >
          <Text style={styles.donateButtonText}>Donate</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderDonationScreen = () => (
    <ScrollView style={styles.donationContainer}>
      <TouchableOpacity onPress={() => setSelectedCampaign(null)} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#333" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.fundraiserDetailsContainer}>
        <Image source={{ uri: selectedCampaign?.image ?? '' }} style={styles.fundraiserImageWide} />
        <Text style={styles.fundraiserTitle}>{selectedCampaign?.title}</Text>
        <Text style={styles.fundraiserRaised}>{selectedCampaign?.raised}</Text>
        <Text style={styles.fundraiserDescription}>{selectedCampaign?.description}</Text>
      </View>
      <Text style={styles.controlNumberText}>Control Number: 4343-2434-1332-1333</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={donorName}
        onChangeText={setDonorName}
      />

<TextInput
  style={styles.input}
  placeholder="Phone Number (+255...)"
  keyboardType="phone-pad"
  value={donorPhoneNumber}
  onChangeText={(text) => {
    setDonorPhoneNumber(text);
  }}
/>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={donorEmail}
        onChangeText={setDonorEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Amount (Tsh)"
        keyboardType="numeric"
        maxLength={10}
        value={donationAmount}
        onChangeText={setDonationAmount}
      />
      <View style={styles.gatewayContainer}>
        <Text style={styles.gatewayLabel}>Choose a Gateway:</Text>
        <TouchableOpacity
          style={[styles.gatewayOption, selectedGateway === 'Airtel' && styles.selectedGateway]}
          onPress={() => setSelectedGateway('Airtel')}
        >
          <Text>Airtel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.gatewayOption, selectedGateway === 'Vodacom' && styles.selectedGateway]}
          onPress={() => setSelectedGateway('Vodacom')}
        >
          <Text>Vodacom</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.gatewayOption, selectedGateway === 'Tigo' && styles.selectedGateway]}
          onPress={() => setSelectedGateway('Tigo')}
        >
          <Text>Tigo</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.payButton} onPress={handlePay}>
        <Text style={styles.payButtonText}>Pay</Text>
      </TouchableOpacity>

      <Modal
        visible={isPinModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsPinModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter PIN</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter PIN"
              keyboardType="numeric"
              secureTextEntry
              value={pin}
              onChangeText={setPin}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={() => setIsPinModalVisible(false)}
              >
                <Text style={styles.modalCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalSendButton]}
                onPress={handleSendPin}
              >
                <Text style={styles.modalSendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {!selectedCampaign ? (
        <>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            style={styles.categoryList}
          />
          {selectedCategory && (
            <FlatList
              data={selectedCategory.campaigns}
              renderItem={renderCampaignItem}
              keyExtractor={(item) => item.id}
              style={styles.campaignList}
            />
          )}
        </>
      ) : (
        renderDonationScreen()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
  },
  categoryList: {
    marginVertical: 16,
  },
  categoryItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 16,
    marginLeft: 36, // Increase marginLeft for Education icon
    marginTop: 20,
  },
  categoryText: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: 'bold',
  },
  campaignList: {
    flex: 1,
  },
  campaignItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  campaignImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  campaignDetails: {
    flex: 1,
  },
  campaignTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  campaignRaised: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  donateButton: {
    backgroundColor: '#00b894',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  donateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  donationContainer: {
    flex: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
  },
  fundraiserDetailsContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  fundraiserImageWide: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  fundraiserTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  fundraiserRaised: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  fundraiserDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  controlNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  gatewayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  gatewayLabel: {
    marginRight: 8,
  },
  gatewayOption: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 4,
  },
  selectedGateway: {
    backgroundColor: '#00b894',
    borderColor: '#00b894',
    color: '#fff',
  },
  payButton: {
    backgroundColor: '#00b894',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  modalCancelButton: {
    backgroundColor: '#ddd',
  },
  modalSendButton: {
    backgroundColor: '#00b894',
  },
  modalCancelButtonText: {
    color: '#333',
  },
  modalSendButtonText: {
    color: '#fff',
  },
});

export default Donation;
