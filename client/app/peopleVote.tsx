import * as React from 'react';
import { View, Text, Button, StyleSheet, Image, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

// Simulated API response
const simulatedApiResponse = {
  userId: '12345',
  voted: "approve", // Change this to 'Approved' or 'Denied' to simulate different scenarios
};

const PeopleVote = () => {
  const { issue } = useLocalSearchParams();
  const parsedIssue = JSON.parse(issue);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [submissionType, setSubmissionType] = React.useState(''); // 'approve' or 'deny'

  React.useEffect(() => {
    // Simulate fetching the voting status from the backend
    const { voted } = simulatedApiResponse;
    if (voted) {
      setIsSubmitted(true);
      setSubmissionType(voted.toLowerCase());
    }
  }, []);

  const handleApprove = () => {
    Alert.alert(
      'Confirm Approval',
      'Are you sure you want to approve this issue?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Approve',
          onPress: () => {
            // Simulate sending approval to the backend
            console.log('Approved:', parsedIssue.id);
            setIsSubmitted(true);
            setSubmissionType('approve');
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleDeny = () => {
    Alert.alert(
      'Confirm Denial',
      'Are you sure you want to deny this issue?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Deny',
          onPress: () => {
            // Simulate sending denial to the backend
            console.log('Denied:', parsedIssue.id);
            setIsSubmitted(true);
            setSubmissionType('deny');
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Issue Name: {parsedIssue.name}</Text>
      <Text style={styles.subtitle}>Problem Type: {parsedIssue.problem_type}</Text>
      <Text style={styles.description}>Description: {parsedIssue.description}</Text>
      <Image source={{ uri: parsedIssue.image }} style={styles.image} />
      <Text style={styles.date}>Date of Complaint: {parsedIssue.date_of_complaint}</Text>
      <Text style={styles.status}>Status: {parsedIssue.status}</Text>
      {parsedIssue.votable ? (
        <View style={styles.buttonContainer}>
          {!isSubmitted ? (
            <>
              <Button title="Approve" onPress={handleApprove} />
              <Button title="Deny" onPress={handleDeny} />
            </>
          ) : (
            <Button
              title={submissionType === 'approve' ? 'Approved' : 'Denied'}
              disabled
            />
          )}
        </View>
      ) : (
        <Text style={styles.notVotable}>You are not within the voting range for this issue.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    marginVertical: 8,
  },
  description: {
    fontSize: 16,
    marginVertical: 8,
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 8,
  },
  date: {
    fontSize: 16,
    marginVertical: 8,
  },
  status: {
    fontSize: 16,
    marginVertical: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  notVotable: {
    fontSize: 16,
    color: 'red',
    marginTop: 16,
  },
});

export default PeopleVote;