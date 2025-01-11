import * as React from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image } from 'react-native';
import { Card } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import axios from 'axios';

const PeopleIssue = () => {
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [dateOfComplaint, setDateOfComplaint] = useState(new Date().toISOString().split('T')[0]);

  const handleCaptureImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true, // Add this line to get the Base64 string
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].base64); // Store the Base64 string
    }
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
  };

  const handleSubmit = async () => {
    if (!issueType || !description || !image || !location) {
      alert('Please fill in all fields and capture an image.');
      return;
    }

    const issue = {
      id: new Date().getTime().toString(),
      issue_type: issueType,
      description,
      date_of_complaint: dateOfComplaint,
      approval: 0,
      denial: 0,
      status: 'pending',
       // Send the Base64 string with the data URI prefix
      location,
    };

    try {
      const response = await axios.post('http://192.168.54.213:4000/issues', issue);
      console.log('Issue raised:', response.data);
      alert('Issue raised successfully!');
    } catch (error) {
      console.error('Error raising issue:', error);
      alert('There was an error raising the issue. Please try again.');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.label}>Issue Type</Text>
          <TextInput
            style={styles.input}
            value={issueType}
            onChangeText={setIssueType}
            placeholder="Enter issue type"
          />
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description"
            multiline
          />
          <Button title="Capture Image" onPress={handleCaptureImage} />
          {image && <Image source={{ uri: `data:image/jpeg;base64,${image}` }} style={styles.image} />}
          <Button title="Submit Issue" onPress={handleSubmit} />
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 8,
  },
});

export default PeopleIssue;