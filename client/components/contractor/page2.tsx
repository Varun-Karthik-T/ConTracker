
    import React, { useEffect, useState } from 'react';
    import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
    import { Card } from 'react-native-paper';
    import { useRouter } from 'expo-router';
    import tenderData from './contractdata.json'; // Import the JSON file directly
    
    interface MyComponentProps {
      title: string;
      content: string;
      onPress: () => void;
    }
    
    const MyComponent: React.FC<MyComponentProps> = ({ title, content, onPress }) => (
      <TouchableOpacity onPress={onPress}>
        <Card>
          <Card.Content>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardContent}>{content}</Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
    
    const CardWithMargin = ({ children }) => (
      <View style={styles.cardContainer}>{children}</View>
    );
    
    export default function Page2() {
      const [data, setData] = useState<Array<any>>([]);
      const router = useRouter();
    
      useEffect(() => {
        // Simulate fetching data (since we're importing JSON directly)
        setData(tenderData);
      }, []);
    
      return (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Your Contracts</Text>
          {data.map((item) => (
            <CardWithMargin key={item.referenceId}>
              <MyComponent
                title={item.organisationChain}
                content={item.referenceId}
                onPress={() => router.push({ pathname: '/ContractDesc', params: { contract : JSON.stringify(item) } })}
              />
            </CardWithMargin>
          ))}
        </ScrollView>
      );
    }
    
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
      cardContainer: {
        margin: 10,
      },
      cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
      },
      cardContent: {
        fontSize: 16,
        color: '#16a085',
      },
    });