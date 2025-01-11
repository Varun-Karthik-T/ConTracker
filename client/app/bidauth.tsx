import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';

const BidAuth = () => {
  const { tender } = useLocalSearchParams();
  const contractData = JSON.parse(tender);

  // Dummy bidders data
  const [bidders, setBidders] = useState([
    { id: 1, name: 'John Doe', bidAmount: 50000 },
    { id: 2, name: 'Jane Smith', bidAmount: 45000 },
    { id: 3, name: 'Alice Johnson', bidAmount: 47000 },
  ]);

  const [selectedBidder, setSelectedBidder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleApproveBid = async () => {
    if (!selectedBidder) {
      Alert.alert('Error', 'Please select a bidder to approve');
      return;
    }

    setIsLoading(true);

    try {
      // Send the winner data to the server
      const data = {
        name: selectedBidder.name,
        bidAmount: selectedBidder.bidAmount,
        contractId: contractData._id,
        contractorId: selectedBidder.id
      };
    //   const response = await axios.post('http://192.168.54.15:4000/approveBid', data);

      Alert.alert('Success', 'Bid approved successfully!');
      console.log('Response:', data);
    } catch (error) {
      Alert.alert('Error', 'Failed to approve bid');
      console.error('Error approving bid:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bid Approval</Text>
      {bidders.map((bidder) => (
        <TouchableOpacity key={bidder.id} onPress={() => setSelectedBidder(bidder)}>
          <Card style={[styles.card, selectedBidder?.id === bidder.id && styles.selectedCard]}>
            <Card.Content>
              <Text style={styles.label}>Bidder Name: {bidder.name}</Text>
              <Text style={styles.label}>Bid Amount:  ₹{bidder.bidAmount.toLocaleString()}</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      ))}
      <Button title="Approve Bid" onPress={handleApproveBid} disabled={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    marginBottom: 10,
    width: '100%',
  },
  selectedCard: {
    borderColor: 'green',
    borderWidth: 2,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default BidAuth;