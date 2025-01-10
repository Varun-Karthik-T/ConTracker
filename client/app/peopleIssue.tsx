import * as React from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image } from 'react-native';
import { Card } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';

const PeopleIssue = () => {
  const [issueName, setIssueName] = useState('');
  const [problemType, setProblemType] = useState('');
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
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
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

  const handleSubmit = () => {
    if (!issueName || !problemType || !description || !image || !location) {
      alert('Please fill in all fields and capture an image.');
      return;
    }

    const issue = {
      id: new Date().getTime().toString(),
      name: issueName,
      problem_type: problemType,
      description,
      date_of_complaint: dateOfComplaint,
      approval: 0,
      denial: 0,
      status: 'pending',
      image,
      location,
    };

    console.log('Issue raised:', issue);
    alert('Issue raised successfully!');
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.label}>Issue Name</Text>
          <TextInput
            style={styles.input}
            value={issueName}
            onChangeText={setIssueName}
            placeholder="Enter issue name"
          />
          <Text style={styles.label}>Problem Type</Text>
          <TextInput
            style={styles.input}
            value={problemType}
            onChangeText={setProblemType}
            placeholder="Enter problem type"
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
          {image && <Image source={{ uri: image }} style={styles.image} />}
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