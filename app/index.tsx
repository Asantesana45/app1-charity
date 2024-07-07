import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function About() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/images/compassion-connect-logo.jpg')} style={styles.logo} />
      <Text style={styles.title}>About Compassion Connect</Text>
      <Text style={styles.subtitle}>Who We Are</Text>
      <Text style={styles.text}>
        Compassion Connect is a non-profit organization dedicated to connecting communities through compassionate service and support. Our goal is to inspire and empower individuals to take action and make a positive impact in their communities.
      </Text>

      <Text style={styles.subtitle}>Our Mission</Text>
      <Text style={styles.text}>
        Our mission is to foster a sense of community and provide support to those in need through various programs and initiatives. We believe that by working together, we can create a more compassionate and connected world.
      </Text>

      <Text style={styles.subtitle}>Our Drives</Text>
      <View style={styles.iconTextContainer}>
        <MaterialIcons name="local-hospital" size={24} color="#337ab7" />
        <Text style={styles.iconText}>Health and Wellness Programs</Text>
      </View>
      <View style={styles.iconTextContainer}>
        <MaterialIcons name="school" size={24} color="#337ab7" />
        <Text style={styles.iconText}>Education and Literacy Initiatives</Text>
      </View>
      <View style={styles.iconTextContainer}>
        <MaterialIcons name="restaurant" size={24} color="#337ab7" />
        <Text style={styles.iconText}>Food Security and Nutrition Programs</Text>
      </View>

      <Text style={styles.subtitle}>Our Goals</Text>
      <Text style={styles.text}>
        At Compassion Connect, our goals are to:
        {'\n'}• Promote community engagement and volunteerism.
        {'\n'}• Provide resources and support to those in need.
        {'\n'}• Foster collaboration and partnerships with other organizations.
        {'\n'}• Create sustainable and impactful programs.
      </Text>

      <Text style={styles.subtitle}>Get Involved</Text>
      <Text style={styles.text}>
        We invite you to join us in making a difference. Whether you want to volunteer, donate, or partner with us, there are many ways to get involved and support our mission.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#337ab7',
    marginBottom: 20,
    fontFamily: 'serif',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    textAlign: 'justify',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
  },
});
