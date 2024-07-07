import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ScrollView,
  Modal,
  Linking,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const logoUri = 'https://i.pinimg.com/736x/0e/e6/67/0ee667abf3542a83389429ac51eb1d40.jpg';

interface Fundraiser {
  id: string;
  title: string;
  raised: string;
  image: string;
  description: string;
  organizer: string;
  organizerContact: string;
}

const fundraisers: Fundraiser[] = [
  {
    id: '1',
    title: 'Help Lou koller sick of it all fight cancer.',
    raised: 'Tsh 2,515,263 raised',
    image: 'https://th.bing.com/th/id/OIP.b6W-uulh2r-fYWpEjJf6XQHaDi?rs=1&pid=ImgDetMain',
    description: 'Lou Koller, a well-known figure in the music scene, is battling cancer. We are raising funds to support his medical treatment and care. Every contribution makes a difference. Join us in helping Lou fight this battle.',
    organizer: 'John Smith',
    organizerContact: 'tel:+255123456789',
  },
  {
    id: '2',
    title: 'Support Zahavi Family Recovery from Fire',
    raised: 'Tsh 345,130 raised',
    image: 'https://media.istockphoto.com/photos/african-family-group-of-kids-and-teenagers-picture-id1257529673?k=6&m=1257529673&s=612x612&w=0&h=1g5jvB8p7BhL34CgrrGlO4z5sty-T6FzjBE28b-QoaM=',
    description: 'The Zahavi family lost their home in a recent fire. We are raising funds to help them rebuild their lives and provide them with the support they need to recover.',
    organizer: 'Jane Doe',
    organizerContact: 'tel:+255987654321',
  },
  {
    id: '3',
    title: 'Fund Education for Underprivileged Kids',
    raised: 'Tsh 1,245,780 raised',
    image: 'https://www.care-international.org/sites/default/files/styles/media_block_small/public/2022-04/Sudan_The%20Entrepreneur%20Fighting%20for%20Change_Resource%20ID%2084193.JPG.webp?itok=-rH5VM0x',
    description: 'We are committed to providing educational opportunities for underprivileged children. Your donation will help us fund scholarships, books, and other resources needed for their success.',
    organizer: 'Alice Johnson',
    organizerContact: 'tel:+255112233445',
  },
  {
    id: '4',
    title: 'Medical Support for John Doe',
    raised: 'Tsh 980,000 raised',
    image: 'https://th.bing.com/th/id/OIP.SJUsff3CnWaQuYMG1V5DowHaE8?rs=1&pid=ImgDetMain',
    description: 'John Doe is facing significant medical expenses. Your support will help ease the financial burden and allow him to focus on his recovery.',
    organizer: 'Bob Brown',
    organizerContact: 'tel:+255556677889',
  },
  {
    id: '5',
    title: 'Rebuild Homes After Natural Disaster',
    raised: 'Tsh 2,200,500 raised',
    image: 'https://www.vukuzenzele.gov.za/sites/default/files/locations/Screen%20Shot%202014-10-08%20at%2012.20.43%20PM.png',
    description: 'A recent natural disaster has left many families homeless. We are raising funds to help them rebuild their homes and get back on their feet.',
    organizer: 'Charlie Smith',
    organizerContact: 'tel:+255998877665',
  },
  {
    id: '6',
    title: 'Support Local Animal Shelter',
    raised: 'Tsh 450,320 raised',
    image: 'https://www.go2africa.com/wp-content/uploads/2016/10/geran-de-klerk-yKiLWMWquKE-banner-420x380.jpg',
    description: 'Our local animal shelter needs your help! Donate to provide food, medical care, and shelter for animals in need.',
    organizer: 'David Lee',
    organizerContact: 'tel:+255554433221',
  },
];

const General: React.FC = () => {
  const [filteredFundraisers, setFilteredFundraisers] = useState<Fundraiser[]>([]);
  const [locationPermission, setLocationPermission] = useState<boolean | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('Trending');
  const [selectedFundraiser, setSelectedFundraiser] = useState<Fundraiser | null>(null);
  const [donationAmount, setDonationAmount] = useState<string>('');
  const [selectedGateway, setSelectedGateway] = useState<string>('M-Pesa');
  const [donationSuccess, setDonationSuccess] = useState<boolean>(false);
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [confirmPayment, setConfirmPayment] = useState<boolean>(false);
  const [pin, setPin] = useState<string>('');
  const [pinModalVisible, setPinModalVisible] = useState<boolean>(false);
  const [thankYouModalVisible, setThankYouModalVisible] = useState<boolean>(false);

  useEffect(() => {
    setFilteredFundraisers(fundraisers.slice(0, 4)); // Default to Trending
  }, []);

  const handleTrendingPress = () => {
    setActiveTab('Trending');
    setFilteredFundraisers(fundraisers.slice(0, 4));
  };

  const handleNearYouPress = async () => {
    if (locationPermission === null) {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Allow location access to see fundraisers near you');
        setLocationPermission(false);
        return;
      }
      setLocationPermission(true);
    }

    if (locationPermission) {
      setActiveTab('Near you');
      setFilteredFundraisers(fundraisers.slice(4, 6));
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setFilteredFundraisers(fundraisers.slice(0, 4)); // Default to Trending
      setRefreshing(false);
    }, 2000); // 2 seconds delay
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text) {
      const filtered = fundraisers.filter(fundraiser =>
        fundraiser.title.toLowerCase().startsWith(text.toLowerCase())
      );
      setFilteredFundraisers(filtered);
    } else {
      setFilteredFundraisers(fundraisers.slice(0, 4)); // Default to Trending
    }
  };

  const renderFundraiserItem = ({ item }: { item: Fundraiser }) => (
    <TouchableOpacity style={styles.fundraiserItem} onPress={() => setSelectedFundraiser(item)}>
      <Image source={{ uri: item.image }} style={styles.fundraiserImage} />
      <View style={styles.fundraiserDetails}>
        <Text style={styles.fundraiserTitle}>{item.title}</Text>
        <Text style={styles.fundraiserRaised}>{item.raised}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleDonation = async () => {
    setConfirmPayment(true);
  };

  const handleConfirmPayment = () => {
    setConfirmPayment(false);
    setPinModalVisible(true);
  };

  const handlePinSubmit = () => {
    setPinModalVisible(false);
    setThankYouModalVisible(true);
    setTimeout(() => {
      setThankYouModalVisible(false);
      setDonationSuccess(true);
      setTimeout(() => {
        setDonationSuccess(false);
        setSelectedFundraiser(null);
        setDonationAmount('');
        setMobileNumber('');
        setPin('');
      }, 2000);
    }, 2000);
  };

  const handleContactOrganizer = (contact: string) => {
    Linking.openURL(contact);
  };

  const handleShare = async (fundraiser: Fundraiser) => {
    try {
      await Share.share({
        message: `${fundraiser.title}\n\n${fundraiser.description}\n\nRaised: ${fundraiser.raised}\n\nSupport this cause: ${fundraiser.image}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to share fundraiser.');
    }
  };

  const renderDonationScreen = () => (
    <ScrollView style={styles.donationContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => setSelectedFundraiser(null)}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.donationTitle}>{selectedFundraiser?.title}</Text>
      <Image source={{ uri: selectedFundraiser?.image }} style={styles.donationImage} />
      <Text style={styles.donationDescription}>{selectedFundraiser?.description}</Text>
      <TextInput
        placeholder="Enter Donation Amount"
        value={donationAmount}
        onChangeText={setDonationAmount}
        keyboardType="numeric"
        style={styles.input}
      />

      
   <TextInput
  placeholder="Enter Mobile Number"
  value={mobileNumber}
  onChangeText={(text) => {
    setMobileNumber(text);
  }}
  keyboardType="phone-pad"
  style={styles.input}
/>
      <Text style={styles.label}>Payment Gateway:</Text>
      <TouchableOpacity
        style={[
          styles.gatewayOption,
          selectedGateway === 'M-Pesa' && styles.selectedGatewayOption,
        ]}
        onPress={() => setSelectedGateway('M-Pesa')}
      >
        <Text style={styles.gatewayText}>M-Pesa</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.gatewayOption,
          selectedGateway === 'Airtel Money' && styles.selectedGatewayOption,
        ]}
        onPress={() => setSelectedGateway('Airtel Money')}
      >
        <Text style={styles.gatewayText}>Airtel Money</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.gatewayOption,
          selectedGateway === 'Tigo Pesa' && styles.selectedGatewayOption,
        ]}
        onPress={() => setSelectedGateway('Tigo Pesa')}
      >
        <Text style={styles.gatewayText}>Tigo Pesa</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.donateButton} onPress={handleDonation}>
        <Text style={styles.donateButtonText}>Donate</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.contactButton} onPress={() => handleContactOrganizer(selectedFundraiser?.organizerContact!)}>
        <Text style={styles.contactButtonText}>Contact Organizer</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.shareButton} onPress={() => handleShare(selectedFundraiser!)}>
        <Text style={styles.shareButtonText}>Share</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: logoUri }} style={styles.logo} />
        <Text style={styles.title}>Fundraiser</Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Trending' && styles.activeTab]}
          onPress={handleTrendingPress}
        >
          <Text style={styles.tabText}>Trending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Near you' && styles.activeTab]}
          onPress={handleNearYouPress}
        >
          <Text style={styles.tabText}>Near you</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="Search"
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.searchInput}
      />
      {selectedFundraiser ? (
        renderDonationScreen()
      ) : (
        <FlatList
          data={filteredFundraisers}
          renderItem={renderFundraiserItem}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      )}

      <Modal visible={confirmPayment} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Payment</Text>
            <Text style={styles.modalText}>
              Donation Amount: Tsh {donationAmount}
            </Text>
            <Text style={styles.modalText}>Mobile Number: {mobileNumber}</Text>
            <Text style={styles.modalText}>Gateway: {selectedGateway}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleConfirmPayment}
            >
              <Text style={styles.modalButtonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setConfirmPayment(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={pinModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter PIN</Text>
            <TextInput
              placeholder="Enter PIN"
              value={pin}
              onChangeText={setPin}
              secureTextEntry
              style={styles.input}
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handlePinSubmit}
            >
              <Text style={styles.modalButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={thankYouModalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Thank you for donating!</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 8,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 16,
  },
  searchInput: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
    margin: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  fundraiserItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  fundraiserImage: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  fundraiserDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  fundraiserTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  fundraiserRaised: {
    fontSize: 14,
    color: '#777',
  },
  donationContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 16,
  },
  donationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  donationImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  donationDescription: {
    fontSize: 16,
    marginBottom: 16,
  },
  input: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  gatewayOption: {
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedGatewayOption: {
    backgroundColor: '#d0d0d0',
  },
  gatewayText: {
    fontSize: 16,
  },
  donateButton: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 4,
    marginTop: 16,
    alignItems: 'center',
  },
  donateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactButton: {
    backgroundColor: '#28A745',
    padding: 16,
    borderRadius: 4,
    marginTop: 16,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  shareButton: {
    backgroundColor: '#17A2B8',
    padding: 16,
    borderRadius: 4,
    marginTop: 16,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 16,
  },
  modalButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 4,
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default General;
