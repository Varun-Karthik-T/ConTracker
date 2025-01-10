import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TextInput as RNTextInput } from 'react-native';
import { Button, TextInput, RadioButton } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import { useLocalSearchParams } from 'expo-router';

const ContractDesc = () => {
  const { contract } = useLocalSearchParams();
  const contractData = JSON.parse(contract); // Parse the contract data passed from the previous screen

  const [document, setDocument] = useState<DocumentPicker.DocumentPickerResult | null>(null);
  const [amountUsed, setAmountUsed] = useState(0); // Total amount used
  const [paymentMade, setPaymentMade] = useState(''); // Amount entered by the user
  const [selectedOption, setSelectedOption] = useState(''); // Selected radio option
  const [otherText, setOtherText] = useState(''); // Text input for "Other" option

  // Handle document upload
  const handleDocumentUpload = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf', // Allow only PDF files
      });

      console.log('Document Picker Result:', res); // Debugging line

      if (!res.canceled) {
        setDocument(res.assets[0]); // Use the first selected file
      } else {
        console.log('User cancelled document picker');
      }
    } catch (err) {
      console.log('Document picker error:', err);
    }
  };

  // Handle payment made input
  const handlePaymentMade = (text: string) => {
    setPaymentMade(text);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!document) {
      Alert.alert('Error', 'Please upload a document');
      return;
    }

    const payment = parseFloat(paymentMade);
    if (isNaN(payment) || payment <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    // Use the functional form of setAmountUsed to ensure the latest state value
    setAmountUsed((prevAmountUsed) => {
      const newAmountUsed = prevAmountUsed + payment;

      // Prepare bid data with the updated amountUsed
      const bidData = {
        bidAmount: contractData.bidAmount,
        amountUsed: newAmountUsed,
        document: document,
      };

      console.log('Bid Data:', bidData);
      Alert.alert('Success', 'Bid submitted successfully!');

      // Clear the payment input and document
      setPaymentMade('');
      setDocument(null);

      return newAmountUsed;
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Contract Details</Text>

      {/* Contract Details */}
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Organisation:</Text>
        <Text style={styles.value}>{contractData.organisationChain}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Reference ID:</Text>
        <Text style={styles.value}>{contractData.referenceId}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Bid Amount:</Text>
        <Text style={styles.value}>₹{contractData.bidAmount.toLocaleString()}</Text>
      </View>

      {/* Amount Used */}
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Amount Used:</Text>
        <Text style={styles.value}>₹{amountUsed.toLocaleString()}</Text>
      </View>

      {/* Radio Options */}
      <View style={styles.radioContainer}>
        <Text style={styles.label}>Select Material:</Text>
        <RadioButton.Group onValueChange={(value) => setSelectedOption(value)} value={selectedOption}>
          <RadioButton.Item label="Rods" value="rods" />
          <RadioButton.Item label="Sand" value="sand" />
          <RadioButton.Item label="Cement" value="cement" />
          <RadioButton.Item label="Other" value="other" />
        </RadioButton.Group>

        {/* Text Input for "Other" */}
        {selectedOption === 'other' && (
          <TextInput
            label="Enter Material"
            mode="outlined"
            value={otherText}
            onChangeText={(text) => setOtherText(text)}
            style={styles.input}
          />
        )}
      </View>

      {/* Payment Made */}
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Payment Made:</Text>
        <TextInput
          label="Enter Amount"
          mode="outlined"
          keyboardType="numeric"
          value={paymentMade}
          onChangeText={handlePaymentMade}
          style={styles.input}
        />
      </View>

      {/* Document Upload */}
      <Button
        mode="contained"
        onPress={handleDocumentUpload}
        style={styles.uploadButton}
      >
        {document ? 'Change Document' : 'Upload Document'}
      </Button>

      {/* Display Selected Document */}
      {document && (
        <View style={styles.documentContainer}>
          <Text style={styles.documentText}>
            Selected Document: {document.name}
          </Text>
        </View>
      )}

      {/* Submit Button */}
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.submitButton}
      >
        Submit payment details
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2c3e50',
  },
  detailContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: '#16a085',
  },
  radioContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#ffffff',
  },
  addButton: {
    marginTop: 10,
    backgroundColor: '#16a085',
  },
  uploadButton: {
    marginBottom: 15,
    backgroundColor: '#16a085',
  },
  documentContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  documentText: {
    fontSize: 14,
    color: '#34495e',
    textAlign: 'center',
  },
  submitButton: {
    marginTop: 10,
    backgroundColor: '#2c3e50',
  },
});

export default ContractDesc;